interface RowspanizerOptions
{
    target: string;
    colspan_index?: number;
}

export class Rowspanizer
{
    private options:
        RowspanizerOptions;
        constructor(options: RowspanizerOptions)
        {
            this.options = options;
        }
    public rowspanize(): void 
    {
        console.log('Rowspanizing', this.options.target);
        const targetElement = document.querySelector(this.options.target) as HTMLElement;
        if(!targetElement)
        {
            console.error('Target', this.options.target, 'not found.');
            return;
        }
        const rows = targetElement.getElementsByTagName('tr');
        const colCount = this.getColCount(rows);
        for(let col = 0; col < colCount; col++)
        {
            let currentCellValue: string | null = null;
            let rowspan = 1;
            let the_target_cell: HTMLTableCellElement | null = null;
            const rowCount = rows.length;
            for(let row = 0; row < rowCount; row++)
            {   
                // Get the cell value
                let cellValue: string | null = null;
                const rowElement = rows[row];
                const cells = rowElement.getElementsByTagName('td');
                const cell = cells[col];
                if(cell)
                {
                    cellValue = cell.innerHTML;
                    // console.log(cellValue);
                }
                else
                {   
                    continue;
                }
                console.log(cellValue, rowspan);
                if(!the_target_cell)
                {
                    the_target_cell = cell;
                }
                // If the cell value is the same as the previous cell value
                if(cellValue === currentCellValue && cellValue !== null)
                {
                    // add a class specifying that the cell should be hidden
                    cell.style.display = 'none';
                    rowspan++;
                }
                // If the cell value is different from the previous cell value
                else if(cellValue !== currentCellValue && cellValue !== null)
                {
                    if(the_target_cell && currentCellValue !== null)
                    {
                        // Set the rowspan of the target cell to the rowspan value
                        the_target_cell.setAttribute('rowspan', rowspan.toString());
                        console.log(the_target_cell, rowspan);
                        the_target_cell = cell;
                    }
                    currentCellValue = cellValue;
                    rowspan = 1;
                }
                if(row === rowCount - 1 && the_target_cell && rowspan > 1)
                {
                    // If we are at the end of the table and the_target_cell is not null, set the rowspan
                    the_target_cell.setAttribute('rowspan', rowspan.toString());
                }
                currentCellValue = cellValue;
            }
        }
    }
    private getColCount(rows: HTMLCollectionOf<HTMLTableRowElement>): number
    {
        let maxColCount = 0;

        for(let i = 0; i < rows.length; i++)
        {
            const row = rows[i];
            const cells = row.getElementsByTagName('td');
            const colCount = cells.length;
            if(colCount > maxColCount)
            maxColCount = colCount;
        }
        return maxColCount;
    }
};

