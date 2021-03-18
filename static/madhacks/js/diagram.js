function create_pi() {
    var options = {
        backgroundColor: null,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        // title: {
        //     text: "Your Carbon Emission is " + bucky.calculate_carbon() + "."
        // },

        data: [{
                type: "pie",
                startAngle: 45,
                showInLegend: "true",
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                yValueFormatString:"#,##0.#"%"",
                dataPoints: [
                    { label: "Dye", y: bucky.get_skin_cal() },
                    { label: "Live", y: bucky.get_back_cal() },
                    { label: "Transportation", y: bucky.get_trans_cal() },
                    { label: "Decoration", y: bucky.get_hat_cal() },
                    { label: "Cloth", y: bucky.get_cloth_cal() },
                    { label: "Shoes", y: bucky.get_shoes_cal() },
                    { label: "Activities", y: bucky.get_activity_cal() }
                    // { label: "Others", y: 3 }
                ]
        }]
    };
    $("#final-evalu").prepend("<div id='canvas-draw'></div>")
    $("#canvas-draw").CanvasJSChart(options);
}