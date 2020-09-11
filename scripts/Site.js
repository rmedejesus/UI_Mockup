$(document).ready(function () {

    $("#logo").hide();

    $("#dateSearch").daterangepicker({
        "locale": {
            "format": 'YYYY/MM/DD'
        }
    });

    var ddte = $(".ranDate");
    for (var i = 0; i < ddte.length; i++) {
        var expo = ddte.eq(i);

        function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }

        randomDt = randomDate(new Date(2020, 0, 1), new Date());
        randomDtToString = randomDt.toString();
		
		ddte.eq(i).attr('dt', randomDt)

        expo.html(randomDtToString.split(' ')[1] + ' ' + randomDtToString.split(' ')[2]);
    }

    $("#result").html("Results: " + $(".ranDate").length + " mail(s)");

    $('#dateSearch').on('apply.daterangepicker', function () {
		startDateArray = $("#dateSearch").val().split(' -')[0];
		endDateArray = $("#dateSearch").val().split('- ')[1];
		
		stdtArray = startDateArray.split("/");
		edtArray = endDateArray.split("/");
		
		var startDateTimeStamp = new Date(stdtArray[0],stdtArray[1],stdtArray[2]).getTime();
		var endDateTimeStamp = new Date(edtArray[0],edtArray[1],edtArray[2]).getTime();
		
		var rowCount = 0;

		$(".ranDate").each(function() {
			var rowDate = $(this).attr('dt');
			var rdt = new Date(rowDate);
			rowDateArray= rdt.toLocaleDateString().split("/");

			var rowDateTimeStamp =  new Date(rowDateArray[2],rowDateArray[0],rowDateArray[1]).getTime() ;
					
			if((rowDateTimeStamp >= startDateTimeStamp) && (rowDateTimeStamp <= endDateTimeStamp)) {
				$(this).parent().show();				
				rowCount++;
			} else {
				$(this).parent().hide();
			}
		});
		
		if (rowCount > 0) {
			$("#logo").hide();
			$(".header").show();
		} else {
			$("#logo").show();
			$(".header").hide();
		}
		
		$("#result").html("Results: " + rowCount + " mail(s)");
    });

    $(window).on('resize', function () {
        var win = $(this); //this = window

        if (win.width() >= 600) {
            $(".arrowBtn").hide();
            $(".dateBtn").show();
        } else {
            $(".arrowBtn").show();
            $(".dateBtn").hide();
        }

    });

    $(".arrowBtn").hide();
});