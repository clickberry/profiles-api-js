(function(window, $) {
  
  if (!$) {
    return console.error('jQuery required.');
  }

  var clbr = window.clbr = window.clbr || {};

  clbr.profilesApi = function (url) {
    return {
      // Get full profile info
      get: function (id, access_token, fn) {
        $.ajax({
            url: url + '/' + id,
            type: 'GET',
            headers: {'Authorization': 'JWT ' + access_token}
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Get public profile info
      public: function (id, fn) {
        $.ajax({
            url: url + '/public/' + id,
            type: 'GET'
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Get public profile info
      list: function (ids, fn) {
        $.ajax({
            url: url + '/public/list/' + ids.join(','),
            type: 'GET'
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      },

      // Update profile info
      update: function (params, access_token, fn) {
        var data = {
          email: params.email,
          name: params.name,
          avatarUrl: params.avatarUrl
        };

        $.ajax({
            url: url + '/' + params.id,
            type: 'PUT',
            headers: {'Authorization': 'JWT ' + access_token},
            data: data
          })
          .done(function(result) {
            fn(null, result);
          })
          .fail(function(jqXHR, textStatus, err) {
            fn(err);
          });
      }
    };
  };

})(window, window.jQuery);