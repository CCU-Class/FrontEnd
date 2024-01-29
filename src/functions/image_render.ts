import html2canvas from "html2canvas";

// render a specific html element to an image
export default function renderImage(element: string) {
  let htmlElement: any = document.getElementById(element);
  html2canvas(htmlElement).then(function (canvas) {
    var temp = document.createElement("a");
    temp.href = canvas
      .toDataURL("image/png", 1)
      .replace("image/png", "image/octet-stream");
    temp.download = "curriculum.png";
    temp.click();
  });
}
