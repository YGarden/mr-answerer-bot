(function($)
{
	$('.course-actions').find('a')[4].click();
	var current_point = $('.right').find('.number').html();
	alert(current_point);
})(jQuery);