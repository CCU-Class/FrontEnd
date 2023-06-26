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
        const targetElement = document.querySelector(this.options.target) as HTMLElement;
        if(!targetElement)
        {
            console.error('Target', this.options.target, 'not found.');
            return;
        }
        const rows = targetElement.getElementsByTagName('tr');
        const rowCount = rows.length;
        const colCount = this.getColCount(rows);
        for(let col = 0; col < colCount; col++)
        {
            let currentCellValue: string | null = null;
            let rowspan = 1;

            for(let row = 0; row < rowCount; row++)
            {
                const cell = rows[row].getElementsByTagName('td')[col];

                if(currentCellValue === cell.innerText)
                {
                    rowspan++;
                    cell.style.display = 'none';
                }
                else
                {
                    currentCellValue = cell.innerText;
                    cell.setAttribute('rowspan', rowspan.toString());
                    rowspan = 1;
                }
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