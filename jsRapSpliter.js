$(window).resize(function () {
	$('.rapSpliter').each(function () {
		this.Render();
	});
});

(function ($) {
	$.fn.jsRapSpliter = function (options) {

		return this.each(function () {
			this.opt = $.extend({
				height: '200px',
				horizontal: false,
				position: 0.5,
				spliterWidth: 8.0
			}, options);
			let base = this;
			let active = false;
			$(this).addClass('rapSpliter').css({ height: this.opt.height });
			this.panel1 = $('div:first', this)[0];
			this.panel2 = $('div:last', this)[0];
			this.spliter = $('<div>')[0];
			if (this.opt.horizontal) {
				$(this.panel1).addClass('panel1H');
				$(this.panel2).addClass('panel2H');
				$(this.spliter).addClass('spliterH');
			} else {
				$(this.panel1).addClass('panel1V');
				$(this.panel2).addClass('panel2V');
				$(this.spliter).addClass('spliterV');
			}
			$(this.panel1).after(this.spliter);
			$(this.spliter).bind({
				mousedown: function (e) {
					active = e.buttons == 1;
				}
			});
			$(this).bind({
				mousemove: function (e) {
					if (active)
						base.UpdatePosition(e);
				},
				mouseup: function (e) {
					active = false;
				}
			});

			this.UpdatePosition = function (e) {
				if (this.opt.horizontal) {
					let ph = (e.clientY - $(base)[0].getBoundingClientRect().top) / $(base).height();
					this.SetPositionH(ph);
				} else {
					let pv = (e.clientX - $(base)[0].getBoundingClientRect().left) / $(base).width();
					this.SetPositionV(pv);
				}
			}

			this.SetPositionV = function (pro) {
				base.opt.position = pro;
				let w = $(base).width();
				let hsw = base.opt.spliterWidth / 2.0;
				let pos = w * pro;
				if (pos < hsw)
					pos = hsw;
				if (pos > w - hsw)
					pos = w - hsw;
				let x1 = pos - hsw;
				let x2 = w - pos - hsw;
				$(base.panel1).width(x1);
				$(base.panel2).width(x2);
				$(base.spliter).css({ left: x1 + 'px', right: x2 + 'px' });
			}

			this.SetPositionH = function (pro) {
				base.opt.position = pro;
				let h = $(base).height();
				let hsw = base.opt.spliterWidth / 2.0;
				let pos = h * pro;
				if (pos < hsw)
					pos = hsw;
				if (pos > h - hsw)
					pos = h - hsw;
				let y1 = pos - hsw;
				let y2 = h - pos - hsw;
				$(base.panel1).height(y1);
				$(base.panel2).height(y2);
				$(base.spliter).css({ top: y1 + 'px', bottom: y2 + 'px' });
			}

			this.SetPosition = function (pos) {
				if (this.opt.horizontal)
					this.SetPositionH(pos);
				else
					this.SetPositionV(pos);
			}

			this.Render = function () {
				this.SetPosition(this.opt.position);
			}

			this.Render();

		})

	}
})(jQuery);