(function($)
{
	var getQuestion = function()
	{
		return $('.qquestion')[0].childNodes[0].nodeValue.trim();
	};

	var things, thingsUsers;

	var getThings = function()
	{
		things = MEMRISE.garden.things;
		thingsUsers = MEMRISE.garden.thingusers._list;
	};

	var getThingUser = function(id)
	{
		return thingsUsers.filter(function(e)
		{
			return e.thing_id === id;
		})[0];
	};

	var getThingByQuestion = function(question)
	{
		getThings();

		for(var id in things)
		{
			var thing = things[id];
			var thingUser = getThingUser(thing.id);

			if(thingUser)
			{
				var thisQuestion = thing.columns[thingUser.column_b].val;
				var thisAnswer   = thing.columns[thingUser.column_a].val;

				if($.trim(question) === $.trim(thisQuestion))
				{
					return {
						answer: thisAnswer,
						question: thisQuestion
					};
				} else if($.trim(question) === $.trim(thisAnswer)) {
					return {
						answer: thisQuestion,
						question: thisAnswer
					};
				}
			}
		}
	};

	setInterval(function()
	{
		if($('.cnt').children('.js-toggle-silence').length)
		{
			$('.cnt').children('.js-toggle-silence').click();
			$('.btn-yes').click();
		}
		if($('.qquestion').length)
		{
			var question = getThingByQuestion(getQuestion());

			if($('.choice').length !== 0)
			{
				$('.choice').each(function(index)
				{
					if($(this).find('.val').text() === question.answer)
					{
						$(this).click();
					}
				});
			} else if($('.typing-type-here').length) {
				$('.typing-type-here').val(question.answer);
				$('.next-button').click();
			} else if($('.word-box-response').length) {
				var words = question.answer.split(' ');

				$.each(words, function(ind, val)
				{
					$('.word').each(function(index)
					{
						var actualThis = $(this).clone().children().remove().end().text();

						if($.trim(actualThis) == $.trim(val))
							$(this).click();
					});
				});
			}

			return;
		}

		if ($('#forest-banner').html() != undefined)
			{
				$('.next_btn').click();
				location.href="http://www.memrise.com/home/";
				location.reload();
			}


		if($('.next-icon').length) {
			$('.next-icon').click();
		}
	}, 10);
})(jQuery);

/*
(function($)
{
	var set_point = 220000;
    var current_point = $('.right').find('.number').html();

    var getQuestion = function()
		{
			return $('.qquestion')[0].childNodes[0].nodeValue.trim();
		};

		var things, thingsUsers;

		var getThings = function()
		{
			things = MEMRISE.garden.things;
			thingsUsers = MEMRISE.garden.thingusers._list;
		};

		var getThingUser = function(id)
		{
			return thingsUsers.filter(function(e)
			{
				return e.thing_id === id;
			})[0];
		};

		var getThingByQuestion = function(question)
		{
			getThings();

			for(var id in things)
			{
				var thing = things[id];
				var thingUser = getThingUser(thing.id);

				if(thingUser)
				{
					var thisQuestion = thing.columns[thingUser.column_b].val;
					var thisAnswer   = thing.columns[thingUser.column_a].val;

					if($.trim(question) === $.trim(thisQuestion))
					{
						return {
							answer: thisAnswer,
							question: thisQuestion
						};
					} else if($.trim(question) === $.trim(thisAnswer)) {
						return {
							answer: thisQuestion,
							question: thisAnswer
						};
					}
				}
			}
		};

	$('.course-actions').find('a')[3].click();

	setInterval(function()
		{
			if($('.qquestion').length)
			{
				var question = getThingByQuestion(getQuestion());

				if($('.choice').length !== 0)
				{
					$('.choice').each(function(index)
					{
						if($(this).find('.val').text() === question.answer)
						{
							$(this).click();
						}
					});
				} else if($('.typing-type-here').length) {
					$('.typing-type-here').val(question.answer);
					$('.next-button').click();
				} else if($('.word-box-response').length) {
					var words = question.answer.split(' ');

					$.each(words, function(ind, val)
					{
						$('.word').each(function(index)
						{
							var actualThis = $(this).clone().children().remove().end().text();

							if($.trim(actualThis) == $.trim(val))
								$(this).click();
						});
					});
				}

				return;
			}

			if($('.next-icon').length) {
				$('.next-icon').click();
			}
		}, 10);

	setInterval(function() {
		if (location.href == "http://www.memrise.com/home/")
		{
			current_point = $('.right').find('.number').html();
			$('.course-actions').find('a')[3].click();
		} else if ($('#forest-banner').html() != undefined) {
			$('.next_btn').click();
			location.href="http://www.memrise.com/home/";
		}
	}, 10)

})(jQuery);
*/