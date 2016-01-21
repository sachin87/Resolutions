Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: function(){
      if(Session.get('hideFinished')){
        return Resolutions.find({checked: {$ne: true}});
      } else {
        return Resolutions.find();
      }
    },
    hideFinished: function(){
      //console.log(Session.get('hideFinished'))
      return Session.get('hideFinished');
    }
  });

  Template.body.events({
    'submit .new-resolution': function(event){
      var title = event.target.title.value;

      Meteor.call("addResolutions", title);

      event.target.title.value = "";
      return false;
    },
    'change .hide-finished': function(event){
      Session.set('hideFinished', event.target.checked);
    }
  });

  Template.resolution.events({
    'click .toggle-checked': function(){
      Resolutions.update(this._id, {$set: {checked: !this.checked}});
    },
    'click .delete': function(){
      Resolutions.remove(this._id);
    }
  })

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Meteor.methods({
  'addResolutions': function(title){    
      Resolutions.insert({
        title: title,
        createdAt: new Date()
      });
  }
})
