# rsSelect

## Usage

```
$('select').rsSelect();
```

## Options for particular instance

```
$('select').rsSelect({optionKey:optionVal});
```

## Override default options

```
$.fn.rsSelect.defaults.selectedClass = 'active';
$.fn.rsSelect.defaults.autoClose = false;
$('select.header-select').rsSelect();
$('select.form-select').rsSelect();
```

## Options

### disabledClass (string)

Sets CSS class name which is added to wrap (or dropdown item) when it is disabled.
```
default: 'disabled'
```

### selectedClass (string)

Sets CSS class name for selected dropdown item
```
default: 'selected'
```

### expandedClass (string)

Sets CSS class name for open (expanded) dropdown
```
default: 'expanded'
```

### multipleClass (string)

Sets CSS class name  for select with "multiple" attribute
```
default: 'multiple'
```

### speed (int)

Speed of animations for slideDown/slideUp [ms]
```
default: 400
```

### easing (string)

Easing for slideDown/slideUp animation
```
default: ''
```

### autoClose (bool)

Set whether to close the dropdown if user clicks outside of active element
```
default: true
```

### upClass (string/false)

Sets the name of CSS class which is added in situation where there is no space in current window to open the dropdown in down direction. If this property is set to false, nothing happens in this situation.
```
default: 'dropdown-up'
```

### wrap (object)

Object holding settings and values of dropdown element:
	
#### element (string)
	
Type of dropdown html element
```
default: '<div>'
```

#### attrs (object)

Object with html attributes which are added to dropdown wrap element

##### class (string)

CSS class which is added to dropdown element		
```
default: 'dropdown'
```

#### copyClasses (bool)

If this property is set to true, all classes from select element are copied to created dropdown. The only exception are options (selected, expanded, disabled),
```
default: true
```

#### wrapInner (string)

This featured uses jQuery wrapInner method in order to add wrap elements around dropdown
```
default: ''
```

### list (object)

Object holding dropdown list elements
	
#### element (string)

Type of dropdown html list element
```
default: '<div>'
```

#### attrs (object)

Object with html attributes which are added to dropdown list element

##### class (string)

CSS class which is added to dropdown list item element
```
default: 'dd-options'
```

#### wrapInner

This featured uses jQuery wrapInner method in order to add wrap elements around dropdown items
```
default: ''
```

### toggle (object)

Object holding dropdown header toggle settings
	
#### element (string)

Type of header toggle html list element
```
default: '<div>'
```

#### attrs (object)

Object with html attributes which are added to header toggle element

##### class (string)

CSS class which is added to dropdown header toggle element
```
default: 'dd-btn'
```

#### content (function(toggleText, toggle))

Method which generates header toggle html structure together with dynamic text (selected item 1, selected item 2...)
```
default:

function (toggleText, toggle) {
  if (!toggleText) {
    toggleText = '&nbsp'
  }
  return '<span class="dd-current">' + toggleText + '</span><span class="dd-arrow"></span>'
}
```

#### separator (string)

separator for selected elements inside toggleText
```
default: ', '
```

### item (object)

object holding settings for list item element
	
#### element (string)

Type of list item html  element

```
default: '<div>'
```
#### attrs (object)

Object with html attributes which are added to list item element

##### class (string)

CSS class which is added to list item element
```
default: 'dd-item'
```

#### content (function(itemText, item))

Method which generates header list item html structure together with dynamic text
```
default: 
	
function (itemText, item) {
  if (!itemText) {
    itemText = '&nbsp'
  }
  return '<span class="dd-item-text">' + itemText + '</span>'
}
```

#### copyClasses (bool)

If this property is set to true, all classes from select option are copied to matching list item
```
default: true
```

## Callbacks

### afterInit
```
function (dropdown, select) { }
```

### beforeChange
```
function (dropdown, select, item) { }
```

### afterChange
```
function (dropdown, select, item, isChanged) { }
```

### beforeOpen
```
function (dropdown, select) { }
```

### beforeClose
```
function (dropdown, select) { }
```

### afterOpen
```
function (dropdown, select) { }
```

### afterClose
```
function (dropdown, select) { }
```

beforeChange, beforeOpen, beforeClose methods: if exiting with return false, they will abort current change, open or close

####Usage:

```
$('select').rsSelect({
	beforeChange: function(dropdown, select, item){
		var selectedOptions = select.find('option').filter('[selected]');
		if(selectedOptions.length >= 3 && !item.hasClass('selected')){
			alert('max 3 items can be selected');

			return false; // break change
		}
	}
});
```

## Events

Plugin contains the following triggers for events:

### rsSelect.afterInit[dropdown, select]

Notice: afterInit must be set up before calling init method.
```
$('select').on('rsSelect.afterInit', function(evt, dropdown, select){
  console.log('afterInit');
});
$('.custom-select').rsSelect();
```


### rsSelect.beforeChange[dropdown, select, item]

### rsSelect.afterChange[dropdown, select, item, isChanged]

### rsSelect.beforeOpen[dropdown, select]

### rsSelect.beforeClose[dropdown, select]

### rsSelect.afterOpen[dropdown, select]

### rsSelect.afterClose[dropdown, select]

####Usage:

```
$('select').filter(':last').on('rsSelect.afterChange', function(evt, dropdown, select, item, isChanged){
	if(isChanged){
		alert('Thank you!!!');
	}
});
```


## Methods

### Destroy

```
$('select').rsSelect('destroy');
```

### Reinit

Any DOM change needs reinitialization to generate new HTML.

```
$('select').rsSelect('reinit');
```

## Default settings

```
$.fn.rsSelect.defaults = {
  disabledClass: 'is-disabled',
  selectedClass: 'is-selected',
  expandedClass: 'is-expanded',
  multipleClass: 'is-multiple',
  speed: 400,
  easing: '',
  autoClose: true,
  upClass: 'direction-up',
  wrap: {
    element: '<div>',
    attrs: {
      class: 'rs-select'
    },
    copyClasses: true,
    wrapInner: ''
  },
  toggle: {
    element: '<div>',
    attrs: {
      class: 'rs-select-button'
    },
    content: function (toggleText) {
      if (!toggleText) {
        toggleText = '&nbsp'
      }
      return toggleText
    },
    separator: ', '
  },
  list: {
    element: '<ul>',
    attrs: {
      class: 'rs-select-options'
    },
    wrapInner: ''
  },
  item: {
    element: '<li>',
    attrs: {
      class: 'rs-select-option'
    },
    content: function (itemText) {
      if (!itemText) {
        itemText = '&nbsp'
      }
      return itemText
    },
    copyClasses: true
  }
}
```
