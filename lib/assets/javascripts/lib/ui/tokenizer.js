// Generated by CoffeeScript 1.3.3

ce.module("ui.tokenizer", function(self, ce, Backbone, Marionette, $, _) {
  var log, methods;
  log = function() {
    return ce.log.info(arguments_);
  };
  methods = {
    init: function(options) {
      var settings;
      settings = $.extend({}, $.uiTokenizer.defaults, options);
      return this.each(function() {
        return new $.uiTokenizer(this, settings);
      });
    }
  };
  $.fn.uiTokenizer = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments_, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments_);
    } else {
      return $.error("Method " + method + " does not exist on uiTokenizer");
    }
  };
  $.uiTokenizer = function(input, settings) {
    var $hiddenInput, $tokenarea, $wrapper, KEY, alreadyExists, fieldName, is_printable_character, load_default, makeDragHidden, makeDragShown, makeTokenHidden, makeTokenShown, refreshHiddenInput, refreshTokens, refresh_binding, removeTokenFromArray, token_add, token_delete, token_deselect, token_items, token_select, typeahead_select;
    makeDragShown = function(ui) {
      ui.item.addClass("shown").removeClass("hidden").find(".tokenImg").show();
      ui.placeholder.addClass("shown shownPlaceholder").css({
        height: 102,
        width: 72
      }).removeClass("hidden hiddenPlaceholder").find(".tokenImg").show();
      return ui.helper.addClass("shown shownPlaceholder").css({
        height: 102,
        width: 72
      }).removeClass("hidden hiddenPlaceholder").find(".tokenImg").show();
    };
    makeDragHidden = function(ui) {
      ui.item.removeClass("shown").addClass("hidden").find(".tokenImg").hide();
      ui.placeholder.removeClass("shown shownPlaceholder").css({
        height: 16,
        width: 72
      }).addClass("hidden hiddenPlaceholder").find(".tokenImg").hide();
      return ui.helper.removeClass("shown shownPlaceholder").css({
        height: 16,
        width: 72
      }).addClass("hidden hiddenPlaceholder").find(".tokenImg").hide();
    };
    makeTokenShown = function(token) {
      token.addClass("shown").removeClass("hidden").find(".tokenImg").show();
      return token.hasClass("drag");
    };
    makeTokenHidden = function(token) {
      return token.removeClass("shown").addClass("hidden").find(".tokenImg").hide();
    };
    is_printable_character = function(keycode) {
      if ((keycode >= 48 && keycode <= 90) || (keycode >= 96 && keycode <= 111) || (keycode >= 186 && keycode <= 192) || (keycode >= 219 && keycode <= 222)) {
        return true;
      } else {
        return false;
      }
    };
    load_default = function() {
      var list_items, token;
      list_items = settings.defaultValue;
      token = {};
      return $(list_items).each(function() {
        return token_add(this, false);
      });
    };
    typeahead_select = function(token) {
      token_add(token);
      $input.val("");
      return $input.blur();
    };
    refresh_binding = function(token) {
      var tokens;
      if (!token) {
        tokens = $tokenarea.children(".uiToken").not(".droppable_placeholder");
      } else {
        tokens = token;
      }
      tokens.drag("init", function(ev, dd) {
        var placeholder, siblings;
        placeholder = $("<span/>").addClass("uiToken droppable_placeholder");
        siblings = $(this).siblings(".uiToken");
        return $(this).data("placeholder", placeholder);
      });
      return tokens.drag("start", function(ev, dd) {
        var clickOffset, container, placeholder, siblings, startHeight, startIndex, startOffset, startWidth;
        placeholder = $(this).data("placeholder");
        startIndex = $(this).index();
        startHeight = $(this).height();
        startWidth = $(this).width();
        siblings = $(this).data("siblings");
        $(this).data("startIndex", startIndex);
        $(this).data("startHeight", startHeight);
        $(this).data("startWidth", startWidth);
        clickOffset = {
          x: parseInt(ev.pageX - dd.originalX) / 100,
          y: parseInt(ev.pageY - dd.originalY) / 100
        };
        $(this).data("clickOffset", clickOffset);
        startOffset = $(this).height() * clickOffset.y;
        $(this).data("startOffset", startOffset);
        container = $tokenarea.offset();
        $(this).addClass("drag");
        return $(this).css({
          "z-index": "1000"
        });
      }).drag(function(ev, dd) {
        var clickOffset, container, currHeight, currHeightOffset, currWidth, currWidthOffset, drop, left, method, placeholder, rel, startHeight, startIndex, startOffset, startWidth, testX, testY, top;
        placeholder = $(this).data("placeholder");
        clickOffset = $(this).data("clickOffset");
        startOffset = $(this).data("startOffset");
        startHeight = $(this).data("startHeight");
        startWidth = $(this).data("startWidth");
        startIndex = $(this).data("startIndex");
        container = $tokenarea.offset();
        rel = {
          y: parseInt(ev.pageY - container.top),
          x: parseInt(ev.pageX - container.left)
        };
        top = rel.y;
        left = rel.x;
        drop = dd.drop[0];
        method = $.data(drop || {}, "drop+reorder");
        if ($(drop).parents().filter($tokenarea).length > 0) {
          $("#stat-container").html("<div>" + $(drop).text() + "</div>");
          if (drop && $(drop).is(".uiToken") && (drop !== dd.current || method !== dd.method)) {
            $(this).insertBefore(drop);
            dd.current = drop;
            dd.method = method;
            dd.update();
            refreshTokens(clickOffset);
          }
        } else {

        }
        if (settings.type === "tokenImage") {
          if ($(this).index() > 4) {
            placeholder.addClass("hidden hiddenPlaceholder").removeClass("shown shownPlaceholder").css({
              height: $(this).height(),
              width: $(this).width()
            });
          } else {
            placeholder.addClass("shown shownPlaceholder").removeClass("hidden hiddenPlaceholder").css({
              height: $(this).height()
            });
          }
        } else {
          placeholder.removeClass("shown shownPlaceholder").removeClass("hidden hiddenPlaceholder").css({
            height: $(this).height(),
            width: $(this).width()
          });
        }
        currHeight = $(this).height();
        currWidth = $(this).width();
        currHeightOffset = currHeight * clickOffset.y;
        testY = parseFloat(ev.pageY - dd.offsetY) - parseFloat(currHeightOffset);
        currWidthOffset = currWidth * clickOffset.x;
        testX = parseFloat(ev.pageX - dd.offsetX) - parseFloat(currWidthOffset);
        return $(this).css({
          position: "relative",
          "z-index": "1000",
          top: 0,
          left: 0
        });
      }, {
        relative: true
      }).drag("end", function(ev, dd) {
        var container, placeholder, startIndex;
        placeholder = $(this).data("placeholder");
        startIndex = $(this).data("startIndex");
        container = $tokenarea.offset();
        placeholder.remove();
        if (startIndex !== $(this).index()) {
          refreshHiddenInput();
        }
        $(this).css({
          position: "relative",
          "z-index": "0",
          top: 0,
          left: 0,
          "margin-top": "auto"
        });
        return $(this).removeClass("drag");
      }).drop("init", function(ev, dd) {
        return this !== dd.drag;
      });
    };
    token_delete = function($token, item) {
      var override;
      override = settings.onRemove($token, item);
      if (override) {
        removeTokenFromArray(item.value);
        return $token.remove();
      }
    };
    token_deselect = function($token) {
      $token.removeClass("uiTokenSelected").removeClass("uiTokenShownSelected");
      return false;
    };
    token_select = function($token) {
      var $nextToken, $prevToken;
      $nextToken = $token.next();
      $prevToken = $token.prev();
      $token.addClass("uiTokenSelected");
      if ($token.hasClass("shown")) {
        $token.addClass("uiTokenShownSelected");
      }
      $("body").click();
      $("html").one("click", function() {
        token_deselect($token);
        return false;
      });
      return false;
    };
    refreshHiddenInput = function() {
      var counter, tokenLabels, tokenValues;
      tokenLabels = $("[name=\"" + fieldName + "_label\"]").serializeArray();
      tokenValues = $("[name=\"" + fieldName + "_value\"]").serializeArray();
      counter = 0;
      $hiddenInput.html("").val("");
      $(tokenLabels).each(function() {
        var option;
        option = $("<option/>").val(tokenValues[counter].value).attr("selected", true).appendTo($hiddenInput).text(tokenLabels[counter].value);
        return counter++;
      });
      return $hiddenInput.change();
    };
    alreadyExists = function(item) {
      var doesExist;
      doesExist = false;
      $(token_items).each(function() {
        if (this === item) {
          doesExist = true;
          return false;
        }
      });
      return doesExist;
    };
    removeTokenFromArray = function(item) {
      var token_items;
      return token_items = $.grep(token_items, function(a) {
        return a = item;
      });
    };
    token_add = function(token, allowCallback) {
      var $clearer, $hubPhoto, $img, $input, $removeBtn, $token, $tokenImg, $tokenText, hiddenTokens, proceed, shownTokens;
      shownTokens = [];
      hiddenTokens = [];
      $token = $("<span/>");
      $tokenText = $("<span/>").addClass("text").text(token.label);
      $img = $("<img/>");
      $tokenImg = $("<span/>");
      $hubPhoto = $("<div/>");
      $input = $("<input/>").attr({
        type: "hidden",
        value: token.value,
        name: settings.fieldName + "_value",
        autocomplete: "off"
      });
      $clearer = $("<label/>").addClass("remove uiCloseButton");
      $removeBtn = $("<input/>").attr({
        type: "button",
        title: "Remove"
      }).click(function() {
        return token_delete($token, token);
      });
      proceed = true;
      if (allowCallback) {
        proceed = settings.onSelect($token, token);
      }
      if (proceed) {
        switch (settings.type) {
          case "token":
            $token.addClass("uiToken");
            $tokenText.appendTo($token);
            break;
          case "tokenImage":
            $token.addClass("uiToken");
            $img.attr({
              width: settings.typeOpts.imgSize,
              height: settings.typeOpts.imgSize,
              src: token.image
            });
            $tokenImg.addClass("tokenImg").appendTo($token);
            $hubPhoto.css({
              height: settings.typeOpts.imgSize + "px",
              width: settings.typeOpts.imgSize + "px"
            }).addClass("hubPhoto").appendTo($tokenImg);
            $img.appendTo($hubPhoto);
            $tokenText.appendTo($token);
            break;
          case "list":
            $token.addClass("uiListToken");
            $token.text(token.label);
            $clearer.appendTo($token);
            $removeBtn.appendTo($clearer);
            $input.appendTo($token);
            $token.wrapInner("<div class=\"name\"></div>");
            break;
          case "listImage":
            $token.addClass("uiListToken");
            $img.attr({
              width: settings.typeOpts.imgSize,
              height: settings.typeOpts.imgSize,
              src: token.image
            }).addClass("photo img");
            $token.text(token.label);
            $clearer.appendTo($token);
            $removeBtn.appendTo($clearer);
            $img.prependTo($token);
            $input.appendTo($token);
            $token.wrapInner("<div class=\"name\"></div>");
        }
        $tokenarea.addClass("expanded").removeClass("hide");
        $token.prependTo($tokenarea);
        token_items.push(token.value);
      }
      return false;
    };
    KEY = {
      BACKSPACE: 8,
      TAB: 9,
      RETURN: 13,
      ESC: 27,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      COMMA: 188,
      ENTER: 13,
      DELETE: 46
    };
    token_items = [];
    $hiddenInput = $(input).hide().focus(function() {}).blur(function() {
      return $input.blur();
    });
    fieldName = $hiddenInput.attr("name");
    $wrapper = $("<div/>").addClass("uiTokenizer mrl");
    switch (settings.type) {
      case "token":
        settings.typeOpts = {
          imgSize: 0,
          dragOffset: {
            top: -10,
            left: -30
          }
        };
        break;
      case "tokenImage":
        settings.typeOpts = {
          imgSize: 62,
          dragOffset: {
            top: 23,
            left: 30
          }
        };
        $wrapper.addClass("uiImageTokenizer");
        break;
      case "list":
        settings.typeOpts = {
          imgSize: 0,
          dragOffset: {
            top: -10,
            left: 40
          }
        };
        $wrapper.addClass("uiListTokenizer");
        break;
      case "listImage":
        settings.typeOpts = {
          imgSize: 16,
          dragOffset: {
            top: -10,
            left: 40
          }
        };
        $wrapper.addClass("uiListImageTokenizer");
    }
    $tokenarea = $("<div/>").addClass("uiTokenarea hide clearfix");
    $wrapper.insertAfter($hiddenInput);
    $hiddenInput.uiTypeahead({
      watermarkText: settings.watermarkText,
      defaultValue: null,
      queryParam: "q",
      appendTo: $wrapper,
      clearOnSelect: true,
      ajaxSearchURL: settings.ajaxSearchURL,
      ajaxSearchType: settings.ajaxSearchType,
      ajaxSearchParams: settings.ajaxSearchParams,
      ajaxAddURL: settings.ajaxAddURL,
      ajaxAddType: settings.ajaxAddType,
      ajaxAddParams: settings.ajaxAddParams,
      onSelect: function(item) {
        if (!($.inArray(item.value, token_items) >= 0)) {
          token_add(item, true);
        }
        return false;
      }
    });
    if (settings.listLocation === "top") {
      $tokenarea.prependTo($wrapper);
    } else {
      $tokenarea.appendTo($wrapper);
    }
    refreshTokens = function(clickOffset) {
      var counter, textAll, tokens;
      counter = 0;
      tokens = $tokenarea.children(".uiToken").not(".droppable_placeholder");
      if (!clickOffset) {
        clickOffset = {
          x: 0,
          y: 0
        };
      }
      if (settings.type === "tokenImage") {
        textAll = "";
        return tokens.each(function() {
          var index, text, token;
          token = $(this);
          index = token.index();
          text = token.find(".text").text();
          textAll = textAll + ", " + text;
          if (counter < 5) {
            makeTokenShown(token);
          } else {
            makeTokenHidden(token);
          }
          return counter++;
        });
      }
    };
    return load_default();
  };
  return $.uiTokenizer.defaults = {
    ajaxSearchParams: null,
    ajaxAddParams: null,
    ajaxParams: null,
    shownImages: true,
    shownCount: 5,
    listLocation: "bottom",
    defaultValue: [],
    watermarkText: "Type in a search term",
    searchDelay: 300,
    minChars: 1,
    ajaxMethod: "get",
    type: "token",
    tokenLimit: null,
    jsonContainer: null,
    method: "GET",
    tokenTmpl: "<span title=\"${label}\" class=\"uiToken ${shown}\">" + "        <span class=\"tokenImg hide\">" + "            <div style=\"height: 62px; width: 62px;\" class=\"hubPhoto\">" + "                <img height=\"62\" src=\"/static/images/no-photo/none_i.png\" class=\"img\">" + "            </div>" + "        </span>" + "        <span class=\"text\">" + "            ${label}" + "        </span>" + "        <input type=\"hidden\" value=\"${value}\" name=\"${fieldName}\" autocomplete=\"off\">" + "        <input type=\"hidden\" value=\"${label}\" name=\"text_${fieldName}\" autocomplete=\"off\">" + "    </span>",
    contentType: "json",
    autocomplete: null,
    queryParam: "q",
    onResult: null,
    selectFirst: true,
    autoFill: false,
    defaultData: null,
    onRemove: function(item) {
      return true;
    },
    onSelect: function(item) {
      return true;
    }
  };
});