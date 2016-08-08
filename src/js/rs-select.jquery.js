(function( $ ) {

	$.fn.rsSelect = function(method) {
		if (typeof method === 'object' || !method) {
			return $.fn.rsSelect.methods.init.apply(this, arguments);
		} else if ($.fn.rsSelect.methods[method]) {
			return $.fn.rsSelect.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.rsSelect');
		}
    };

	$.fn.rsSelect.methods = {
		init: function(options) {
			var settings = $.extend(true, {}, $.fn.rsSelect.defaults, options);
			settings.extended = true;

			return this.each(function() {
				var $select = $(this).hide();

				// check type
				if(!$select.is('select')) return;

				// clear existing data/element
				if(typeof $select[0].rsSelectDropdown != "undefined"){
					$($select[0].rsSelectDropdown).remove();
					delete $select[0].rsSelectDropdown;
					delete $select[0].rsSelectSettings;
				}

				var $options = $select.find('option');
				var isMultiple = (typeof $select.attr('multiple') !== "undefined") ? true:false;
				var isDisabled = (typeof $select.attr('disabled') !== "undefined") ? true:false;

				if(!isMultiple && $options.filter('[selected]').length < 1){
					$options.filter(':first').prop('selected', true).attr('selected', '');
				}

				// insert dropdown
				var $dropdown = insertDropdown($select, $options, isMultiple, isDisabled);

				// save data/settings
				$dropdown[0].rsSelectSettings = settings;
				$dropdown[0].rsSelectSelect = $select[0];

				$select[0].rsSelectDropdown = $dropdown[0];
				$select[0].rsSelectSettings = settings;

				// set events
				var $items = $dropdown.find('.' + settings.list.attrs.class + ' .' + settings.item.attrs.class);
				setItemEvents($items);
				var $toggle = $dropdown.find('.' + settings.header.attrs.class + ' .' + settings.toggle.attrs.class);
				setToggleEvents($toggle);

			});

			function insertDropdown($select, $options, isMultiple, isDisabled){
				// create wrap
				var $wrap = $(settings.wrap.element , settings.wrap.attrs);

				if(settings.wrap.copyClasses == true){
					$wrap.addClass($select.attr('class'));
				}
				if(isDisabled){
					$wrap.addClass(settings.disabledClass);
				}
				else{
					$wrap.removeClass(settings.disabledClass);
				}
				if(isMultiple){
					$wrap.addClass(settings.multipleClass);
				}
				else{
					$wrap.removeClass(settings.multipleClass);
				}

				// create header
				var $header = $(settings.header.element , settings.header.attrs);
				$wrap.append($header);

				// create header toggle
				var $toggle = $(settings.toggle.element , settings.toggle.attrs);
				$toggle.html(generateToggleContent($options, $toggle));
				$header.append($toggle);

				// create list/items
				var $list = $(settings.list.element , settings.list.attrs).hide();
				$options.each(function(){
					var $option = $(this);
					var $item = $(settings.item.element , settings.item.attrs);

					if(settings.item.copyClasses == true){
						$item.addClass($option.attr('class'));
					}

					if(typeof $option.attr('disabled') !== "undefined"){
						$item.addClass(settings.disabledClass);
					}
					else{
						$item.removeClass(settings.disabledClass);
					}

					if(typeof $option.attr('selected') !== "undefined"){
						$item.addClass(settings.selectedClass);
					}
					else{
						$item.removeClass(settings.selectedClass);
					}

					$item.html(generateItemContent($option, $item));
					$list.append($item);

				});
				$wrap.append($list);

				// wrap inner
				$header.wrapInner(settings.header.wrapInner);
				$list.wrapInner(settings.list.wrapInner);
				$wrap.wrapInner(settings.wrap.wrapInner);

				// insert dropdown
				$wrap.insertAfter($select);

				return $wrap;
			}

			function generateToggleContent($options, $toggle){
				var toggleText = '';

				var $selOptions = $options.filter('[selected]');
				$selOptions.each(function(i){
					var $option = $(this);

					if(i > 0){
						toggleText += settings.toggle.separator;
					}
					toggleText += $option.text();
				});

				return settings.toggle.content(toggleText, $toggle);
			}

			function generateItemContent($option, $item){
				var itemText = $option.text();
				return settings.item.content(itemText, $item);
			}

			function updateSelectOptions($items, $options){
				$items.each(function(i){
					var $item = $(this);
					var itemIndex = $items.index($item);

					if($item.hasClass(settings.selectedClass)){
						$options.eq(itemIndex).prop('selected', true).attr('selected', '');
					}
					else{
						$options.eq(itemIndex).prop('selected', false).removeAttr('selected');
					}
				});
			}

			function setItemEvents($items){
				$items.on('click.rsSelect-item', function(evt){
					var $item = $(this);
					var $dropdown = $item.closest('.' + settings.wrap.attrs.class);
					var $toggle = $dropdown.find('.' + settings.toggle.attrs.class);
					var $list = $dropdown.find('.' + settings.list.attrs.class);
					var $items = $list.find('.' + settings.item.attrs.class);
					var $select = $($dropdown[0].rsSelectSelect);
					var $options = $select.find('option');




					var isDisabled = ($dropdown.hasClass(settings.disabledClass) || $item.hasClass(settings.disabledClass)) ? true:false;
					var isMultiple = ($dropdown.hasClass(settings.multipleClass)) ? true:false;
					var isSelected = ($item.hasClass(settings.selectedClass)) ? true:false;

					// return if disabled item/dropdown
					if(isDisabled) return false;

					// before change callback
					if(typeof settings.beforeChange == "function" && settings.beforeChange($dropdown, $select) === false) return false;

					// before change trigger
					if(typeof $select.triggerHandler === "function"){
						if($select.triggerHandler("rsSelect.beforeChange", [$dropdown, $select]) === false) return false;
					}

					// change items
					var isChanged = false;

					if(isSelected){
						if(isMultiple && $items.filter('.' + settings.selectedClass).length > 1){
							$item.removeClass(settings.selectedClass);
							isChanged = true;
						}
					}
					else{
						if(!isMultiple){
							$items.removeClass(settings.selectedClass);
						}
						$item.addClass(settings.selectedClass);
						isChanged = true;
					}

					// update select
					updateSelectOptions($items, $options);

					// update dropdown toggle
					$toggle.html(generateToggleContent($options, $toggle));

					// close list
					if(!isMultiple){
						closeList($list);
					}

					// afterChange callback
					if(typeof settings.afterChange == "function"){
						settings.afterChange($dropdown, $select, isChanged);
					}

					// afterChange trigger
					if(typeof $select.triggerHandler === "function"){
						$select.triggerHandler("rsSelect.afterChange", [$dropdown, $select, isChanged]);
					}

					return false;
				});
			}

			function setToggleEvents($toggle){
				$toggle.on('click.rsSelect-toggle', function(evt){
					var $toggle = $(this);
					var $dropdown = $toggle.closest('.' + settings.wrap.attrs.class);
					var $list = $dropdown.find('.' + settings.list.attrs.class);

					if($list.is(':visible')){
						closeList($list);
					}
					else{
						openList($list);
					}

					// evt.preventDefault();
					// return false;
				});
			}

			function openList($list){
				var $dropdown = $list.closest('.' + settings.wrap.attrs.class);
				var $select = $($dropdown[0].rsSelectSelect);
				var easing = (typeof $.easing[settings.easing] != "undefined") ? settings.easing:false;

				// beforeOpen cllback
				if(typeof settings.beforeOpen === "function" && settings.beforeOpen($dropdown, $select) === false) return false;



				// beforeOpen trigger
				if(typeof $select.triggerHandler === "function"){
					if($select.triggerHandler("rsSelect.beforeOpen", [$dropdown, $select]) === false) return false;
				}



				$dropdown.addClass(settings.expandedClass);
				$list.stop(true, false).slideDown(settings.speed, easing, function(){
					// autoclose
					if(settings.autoClose == true){

						// autoclose
						if(settings.autoClose == true){
							
							$(document).on('click.rsSelect-autoclose', autoClose);

							function autoClose(evt){
								if ($(evt.target).closest($dropdown[0]).length === 0) {
									closeList($list);
								}
							}
						}
					}

					// afterOpen callback
					if(typeof settings.afterOpen === "function"){
						settings.afterOpen($dropdown, $select);
					}
					// afterOpen trigger
					if(typeof $select.triggerHandler === "function"){
						$select.triggerHandler("rsSelect.afterOpen", [$dropdown, $select]);
					}


				});
			}

			function closeList($list){
				var $dropdown = $list.closest('.' + settings.wrap.attrs.class);
				var $select = $($dropdown[0].rsSelectSelect);
				var easing = (typeof $.easing[settings.easing] != "undefined") ? settings.easing:false;

				// beforeClose cllback
				if(typeof settings.beforeClose === "function" && settings.beforeClose($dropdown, $select) === false) return false;

				// beforeClose trigger
				if(typeof $select.triggerHandler === "function"){
					if($select.triggerHandler("rsSelect.beforeClose", [$dropdown, $select]) === false) return false;
				}

				// off autoclose event
				if(settings.autoClose == true){
					$(document).unbind('click.rsSelect-autoclose');
				}
				
				$list.stop(true, false).slideUp(settings.speed, easing, function(){
					$dropdown.removeClass(settings.expandedClass);

					// afterClose callback
					if(typeof settings.afterClose=== "function"){
						settings.afterClose($dropdown, $select);
					}
					// afterClose trigger
					if(typeof $select.triggerHandler === "function"){
						$select.triggerHandler("rsSelect.afterClose", [$dropdown, $select]);
					}
				});
			}



		},

        destroy: function(){
        	return this.each(function() {
				var $select = $(this);

				if(!$select.is('select')) return;

				if(typeof $select[0].rsSelectDropdown != "undefined"){
					$($select[0].rsSelectDropdown).remove();
					delete $select[0].rsSelectDropdown;
					delete $select[0].rsSelectSettings;
					$select.css('display', '');
				}
			});
        },

        reinit: function(){
        	return this.each(function() {
				var $select = $(this);

				if(!$select.is('select')) return;

				if(typeof $select[0].rsSelectSettings != "undefined"){
					return $select.rsSelect($select[0].rsSelectSettings);
				}
			});
        }
	}

    $.fn.rsSelect.defaults = {
    	disabledClass: 'disabled',
		selectedClass: 'selected',
		expandedClass: 'expanded',
		multipleClass: 'multiple',
		speed: 400,
		easing: 'easeInOutQuad',
		autoClose: true,

    	wrap: {
			element: '<div>',
			attrs: {
				class: 'dropdown',
				title: 'Select option/s'
			},
			copyClasses: true,
			wrapInner: '<div class="test-wrap-wrap"></div>'
		},
		header: {
			element: '<div>',
			attrs: {
				class: 'dd-select'
			},
			wrapInner: '<div class="test-header-wrap"></div>'
		},
		list: {
			element: '<div>',
			attrs: {
				class: 'dd-options'
			},
			wrapInner: '<div class="test-list-wrap"></div>'
		},
		toggle: {
			element: '<a>',
			attrs: {
				class: 'dd-btn'
			},
			content: function(toggleText, toggle){
				if(!toggleText){
					toggleText = '&nbsp;';
				}
				return '<span class="dd-current">' + toggleText + '</span><span class="dd-arrow"></span>';
			},
			separator: ', '
		},
		item: {
			element: '<div>',
			attrs: {
				class: 'dd-item'
			},
			content: function(itemText, item){
				if(!itemText){
					itemText = '&nbsp;';
				}
				return '<span class="dd-item-text">' + itemText + '</span>';
			},
			copyClasses: true
		},

		// callbacks
		beforeChange: function(dropdown, select){},
		afterChange: function(dropdown, select, isChanged){},
		beforeOpen: function(dropdown, select){},
		beforeClose: function(dropdown, select){},
		afterOpen: function(dropdown, select){},
		afterClose: function(dropdown, select){}
    }

}( jQuery ));
