(function(){
  var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "",
                fontFamily: "Verdana",
                fontColor: "Peru",
                fontSize: 28

            },
            animationEnabled: true,
            axisY: {
                tickThickness: 0,
                lineThickness: 0,
                valueFormatString: " ",
                gridThickness: 0                    
            },
            axisX: {
                tickThickness: 0,
                lineThickness: 0,
                labelFontSize: 18,
                labelFontColor: "Peru"

            },
            data: [
            {
                indexLabelFontSize: 26,
                toolTipContent: "<span style='\"'color: {color};'\"'><strong>{indexLabel}</strong></span><span style='\"'font-size: 20px; color:peru '\"'><strong>{y}</strong></span>",

                indexLabelPlacement: "inside",
                indexLabelFontColor: "white",
                indexLabelFontWeight: 600,
                indexLabelFontFamily: "Verdana",
                color: "#62C9C3",
                type: "bar",
                dataPoints: [
                    { y: 60, label: "60%", indexLabel: "HTML5" },
                    { y: 55, label: "55%", indexLabel: "CSS3" },
                    { y: 70, label: "70%", indexLabel: "JAVASCRIPT" },
                    { y: 80, label: "80%", indexLabel: "JQUERY" },
                    { y: 40, label: "40%", indexLabel: "JADE" },
                    { y: 35, label: "35%", indexLabel: "SASS" },
                    { y: 100, label: "100%", indexLabel: "PASSION" },
                    { y: 100, label: "100%", indexLabel: "Communication" }

                ]
            }
            ]
        });

        chart.render();
})();