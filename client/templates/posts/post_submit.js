Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('postInsert', post, function(error, result) {
      // 显示错误信息并退出
      if (error)
        return throwError(error, error.reason);

      // 显示结果，跳转页面
      if (result.postExists)
        throwError('This link has already been posted（该链接已经存在）');

      Router.go('postPage', {_id: result._id});
    });
  }
});
