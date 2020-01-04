$(function () {
	$(".tab-list .title").on('click', function () {
		if ($(this).hasClass('active')) {
			$(this).siblings(".content-list").hide();
			$(this).removeClass("active")
		} else {
			$(".tab-list .title").removeClass('active');
			$(this).addClass('active');
			$(".tab-list .content-list").hide();
			$(this).siblings(".content-list").show();
		}
	});
	$(".top-tab .tab-item").on("click", function () {
		$(this).addClass('active').siblings().removeClass('active');
		$(".tab-content").hide();
		$(".tab-content").eq($(this).index()).show();
	});
	$(".icon_goback").on("click", function () {
		window.history.back();
	});

	$(".show-result").on('click', function () {
		let bea = Array.from($(this).parents('.content-list').find('input')).every(function (el) {
			return el.value != ''
		});
		if (!bea) {
			//提示语
			alert('error');
			return false;
		}
		$(this).parents('.tab-list').find(".content-list").hide();
		$(this).parents('.tab-list').find(".result").show();
	})
});
