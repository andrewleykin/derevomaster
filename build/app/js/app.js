// Начальная функция


// scroll to
(function () {
	$('.js-scroll-to').on("click", function () {
		if ($(window).width() <= 768) {
			$('.header__mobile-burger').removeClass('active');
			$('.header__menu-block').removeClass('active');
			$('.header__mobile-block').removeClass('active');
			$('body').removeClass('overflow-hidden');
		}
		$('html, body').stop().animate({
			scrollTop: $($(this).attr('href')).offset().top - 100
		}, 400);
		return false;
	});
})();

// mobile menu
(function () {
	if ($(window).width() > 768) return
	var btn = $('.header__mobile-burger'),
		activeClass = 'active'

	btn.click(function (e) {
		e.stopPropagation();

		$(this).toggleClass(activeClass);
		$('.header__menu-block').toggleClass(activeClass);
		$('.header__mobile-block').toggleClass(activeClass);
		$('body').toggleClass('overflow-hidden');
	})

	$('body').keyup(function (e) {
		if (e.which === 27) {
			btn.removeClass(activeClass);
			$('.header__menu-block').removeClass(activeClass);
			$('.header__mobile-block').removeClass(activeClass);
			$('body').removeClass('overflow-hidden');
		}
	})
})();

// header slider
(function () {
	var slider = $('.header__slider-list')
	slider.slick({
		arrows: false,
		variableWidth: true
	})

	$('.header__slider-arrow').click(function (e) {
		e.stopPropagation()
		if ($(this).hasClass('prev')) {
			slider.slick('slickPrev')
		} else {
			slider.slick('slickNext')
		}
	})
})();

// materials slider
(function () {
	var slider = $('.materials__info-slider')
	slider.slick({
		arrows: false,
		asNavFor: '.materials__view-slider',
		responsive: [{
			breakpoint: 768,
			settings: {
				adaptiveHeight: true
			}
		}]
	})

	$('.materials__view-slider').slick({
		arrows: false,
		fade: true,
		asNavFor: '.materials__info-slider',
		swipe: false
	})

	$('.materials__arrow').click(function (e) {
		e.stopPropagation()
		if ($(this).hasClass('prev')) {
			slider.slick('slickPrev')
		} else {
			slider.slick('slickNext')
		}
	})

	$('.materials__slider-current').html('0' + (slider.slick('slickCurrentSlide') + 1))
	$('.materials__slider-all').html(' /0' + slider.slick('getSlick').slideCount)

	slider.on('afterChange', function () {
		$('.materials__slider-current').html('0' + (slider.slick('slickCurrentSlide') + 1))
	})
})();

// portfolio tabs
(function () {
	var items = $('.portfolio__item'),
		tabs = $('.portfolio__tab'),
		hideClass = 'hide',
		activeClass = 'active';

	tabs.first().addClass(activeClass)

	tabs.click(function () {
		var tag = $(this).data('tag')

		$(this).addClass(activeClass).siblings().removeClass(activeClass)

		if (tag === 'all') {
			items.removeClass(hideClass)
			return
		}
		for (i = 0; i < items.length; i++) {
			if (items.eq(i).data('tag').split(',').indexOf(tag) !== -1) {
				items.eq(i).removeClass(hideClass)
			} else {
				items.eq(i).addClass(hideClass)
			}
		}
	})
})();

// form validate
(function () {

	if ($('[data-validation]').length) {
		initializeValidate();
	}
	if ($('.form')) {
		clearForm();
	}

	function clearForm() {
		var inputs = $('.form').find('input, textarea'),
			newVal = '';

		for (i = 0; i < inputs.length; i++) {
			inputs.eq(i).val(newVal);
		}
	}

	/* Validate Form */
	function initializeValidate() {
		$('[data-validation]').each(function () {
			var validator = $(this),
				inputs = validator.find('input:not(:checkbox, [type=hidden]), textarea'),
				submit = validator.find('button[type=submit]'),
				stopSubmit = false;

			inputs.each(function () {
				$(this).focus(function () {
					$(this).siblings().addClass('hide');
					$(this).parent().removeClass('invalid')
				});
				$(this).blur(function () {
					if (!($(this).val())) {
						$(this).siblings().removeClass('hide')
					};
				});
			});
			validator.on('change keyup', 'input[data-name]', function () {
				var elm = $(this);
				checkValidity(elm);
			});

			submit.on('click', function (e) {
				var mass = [];

				stopSubmit = true;

				for (var i = 0; i < inputs.length; i++) {

					var input = inputs[i];
					mass.push(input);

					if (input.checkValidity() == true) {
						var elm = input;
						checkValidity(elm);
					}

					if ($(input).parent().hasClass('valid')) {
						stopSubmit = false;
					} else {
						stopSubmit = true;
						break;
					}
				}

				if (stopSubmit) {
					e.preventDefault();
				}
			});
		});
	}

	function checkValidity(elm) {
		var elm = $(elm),
			val = elm.val(),
			block = elm.parent(),
			name_reg = /^[A-Za-zА-Яа-яЁё\-\s]+$/,
			text_reg = /^[A-Za-zА-Яа-яёЁ\s\d]/,
			mail_reg = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
			phone_reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/,
			num_reg = /^\d+$/;


		if (elm.prop('disabled')) {
			return;
		} else if (elm.is('[data-name="name"]')) {
			if (name_reg.test(val)) {
				block.removeClass('invalid').addClass('valid');
			} else {
				block.removeClass('valid').addClass('invalid');
			}
		} else if (elm.is('[data-name="email"]')) {
			if (mail_reg.test(val)) {
				block.removeClass('invalid').addClass('valid');
			} else {
				block.removeClass('valid').addClass('invalid');
			}
		} else if (elm.is('[data-name="phone"]')) {
			if (phone_reg.test(val)) {
				block.removeClass('invalid').addClass('valid');
			} else {
				block.removeClass('valid').addClass('invalid');
			}
		} else if (elm.is('[data-name="num"]')) {
			if (num_reg.test(val)) {
				block.removeClass('invalid').addClass('valid');
			} else {
				block.removeClass('valid').addClass('invalid');
			}
		} else if (elm.is('[data-name="text"]')) {
			if (text_reg.test(val)) {
				block.removeClass('invalid').addClass('valid');
			} else {
				block.removeClass('valid').addClass('invalid');
			}
		}
	}
})();
$(document).ready(function () {
    svg4everybody({});
});
// Библиотека wow.js для анимации

(function () {
	new WOW().init();
})();