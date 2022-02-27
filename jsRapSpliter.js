(function ($) {
	$.fn.jsRapSpliter = function (options) {

		return this.each(function () {
			let position = $(this).width() / 2.0;
			this.opt = $.extend({
				position: position
			}, options);
			let base = this;
			let active = false;
			$(this).addClass('rapSpliter');
			let panel1 = $('.rapSpliter div:first').addClass('panel1')[0];
			let panel2 = $('.rapSpliter div:last').addClass('panel2')[0];
			let spliter = $('<div>').addClass('spliter')[0];
			$(panel1).after(spliter);
			$(spliter).bind({
				mousedown: function (e) {
					active = e.buttons == 1;
				}
			});
			$(this).bind({
				mousemove: function (e) {
					if (active)
						UpdatePosition(e);
				},
				mouseup: function (e) {
					active = false;
				}
			});

			function UpdatePosition(e) {
				let p = e.clientX - $(base)[0].getBoundingClientRect().left;
				base.SetPosition(p);
			}

			this.SetPosition = function (pos) {
				let w = $(base).width();
				if (pos < 10)
					pos = 10;
				if (pos > w - 10)
					pos = w - 10;
				let x1 = pos - 2;
				let x2 = w - pos - 2;
				$('.panel1').width(x1);
				$('.panel2').width(x2);
				$('.spliter').css({ left: x1 + 'px', right: x2 + 'px' });
			}

			this.SetPosition(this.opt.position);

		})

	}
})(jQuery);