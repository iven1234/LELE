/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

;
(function($) {
	$.fn.extend({
		"directiveTips": function(options) {
			var defaults = {
				tip: []
			};
			options = $.extend(defaults, options);
			var _this = $(this);
			_this.live("click", function() {
				nextTip(0);
			});
			var tipArray = options.tip;
			var tipLength = tipArray.length;
			var positionX; // the tip position-x
			var positionY; // the tip position-y
			var num = 0;
			var tipNum = 0;
			var maxHeight = $(window).height();

			/* show directive tip function */
			function showDirectiveTip(x, y, w, h) {
				if (y > maxHeight) {
					$(document).scrollTop(y - maxHeight + h);
				}
				$("<div id='tip-wrapper' style='z-index: 3000; width: 280px; height: 106px; font-size: 16px;'></div>").append($("<div>").attr("id", "tip-details")).append($("<span>").addClass("sc-icon-no").html("×")).append($("<button>").attr("id", "next-tip").html("下一步")).appendTo(document.body);
				var maxWidth = $(document).width();
				var tipWidth = $("#tip-wrapper").width();
				var tipHeight = $("#tip-wrapper").height();
				if (y < 180) {
					$("#tip-details").css({
						"width": "248px",
						"height": "50px",
						"paddingTop": "40px",
						"paddingLeft": "16px",
						"paddingRight": "16px",
						"paddingBottom": "16px",
						"wordBreak": "break-all"
					});
					if (x > maxWidth / 2) {
						var right = maxWidth - x - w/2 -76;
						if( right<0 ){
							right = maxWidth - x - w;
						}
						$("#tip-wrapper").css("top", y + h + 10).css("right", right);
						$("#tip-wrapper").css({
							"backgroundPositionX": "0",
							"backgroundPositionY": "-317px"
						});
						$("#tip-wrapper .sc-icon-no").css("right", tipWidth);
					}
					else {
						var left = x + w / 2-76;
						if(x + w / 2-70<0){
							left = x;
						}
						$("#tip-wrapper").css("top", y + 10 + h).css("left", left);
						$("#tip-wrapper").css({
							"backgroundPositionX": "0",
							"backgroundPositionY": "-212px"
						});
					}
				}
				else {
					if (x > maxWidth / 2) {
						$("#tip-details").css({
							"paddingTop": "12px",
							"paddingLeft": "58px",
							"paddingRight": "12px",
							"paddingBottom": "12px",
							"wordBreak": "break-all"
						});
						
						$("#tip-wrapper").css("top", y - tipHeight - 10).css("left", x + w - tipWidth);
						$("#tip-wrapper").css({
							"backgroundPositionX": "0",
							"backgroundPositionY": "-106px"
						});
						$("#tip-wrapper .sc-icon-no").css("right", tipWidth + 10);
						$("#tip-wrapper #next-tip").css("left", -80).css("width", "60px");
					}
					else {
						$("#tip-details").css({
							"paddingTop": "12px",
							"paddingLeft": "18px",
							"paddingRight": "58px",
							"paddingBottom": "12px",
							"wordBreak": "break-all"
						});
						$("#tip-wrapper").css({
							"top": y - 120 + "px",
							"left": x + "px"
						});
						$("#tip-wrapper #next-tip").css("left", 160).css("width", "60px");
					}
				}
			}

			/* cilck next step activate this function */
			$("#next-tip").live("click", function() {
//				console.log("点击下一步时，num:---" + num + "即执行next-tip(" + num + ")");
				if ($(this).html() == "完成") {
					$(document).scrollTop(0);
					tipClose();
//					console.log("关闭后，num=" + num);
					return;
				}
				nextTip(num);
//				console.log("next-tip方法执行完之后，num=" + num);
				if (num == tipLength) {
					$("#next-tip").html("完成");
				}
			});

			$("#tip-wrapper .sc-icon-no").live("click", function() {
				tipClose();
			});

			function tipClose() {
				num = 0;
				$("#tip-wrapper").remove();
				for (var j = 0; j < tipLength; j++) {
					$(tipArray[j].name).css("zIndex", "auto");
				}
				$("#tip-modal").css({
					"opacity": "0"
				});
				setTimeout(function() {
					$("#tip-modal").remove();
				}, 300);
			}

			function nextTip(i) {
				/* at the beginning , add the modal ! */
				if (i == 0) {
					$("<div>").attr("id", "tip-modal").css({
						"position": "fixed",
						"top": 0,
						"right": 0,
						"bottom": 0,
						"left": 0,
						"zIndex": "2000",
						"backgroundColor": "#000",
						"opacity": ".5",
						"transition": "opacity .15s linear"
					}).appendTo(document.body);
				}
				
				if ($(tipArray[i].name).length != 0) {
					num = i + 1;
					tipNum++;
					$("#tip-wrapper").remove();
					
					if (tipLength != 0) {
						var tipnum = 0;
						/* at first ,  initialize all the elements of option  */
						for (var k = 0; k < tipLength; k++) {
							$(tipArray[k].name).css("zIndex", "auto");
							var tipPosition = $(tipArray[k].name).css("position");
//							console.log(tipPosition);
//							console.log($(tipArray[k].name).length > 0);
							if (tipPosition == "static") {
//								console.log("nextTip中：是否为relative" + tipPosition);
								$(tipArray[k].name).css("position", "relative");
							}
							if ($(tipArray[k].name).length == 0) {
								continue;
							}
							tipnum++;
						}
						
//						console.log("next-tip中：" + "---i=" + i + "-----" + tipArray[i]);
						positionX = $(tipArray[i].name).offset().left;
						positionY = $(tipArray[i].name).offset().top;
//						console.log("positionX:" + positionX + "----positionY:" + positionY);
//						console.log($(tipArray[i].name));
						showDirectiveTip(positionX, positionY, $(tipArray[i].name).width(), $(tipArray[i].name).height());
						$(tipArray[i].name).css("zIndex", "4000");
						$("#tip-details").html(tipArray[i].details);
						console.log("tipnum="+tipnum);
						if(tipnum == tipNum){
							$("#next-tip").html("完成");
						}
					}
				}
				else {
					num = i + 1;
					if(num==tipLength){
						tipClose();
						return;
					}
					nextTip(i + 1);
//					console.log(i);
				}

			}
		}
	});
})(jQuery);


