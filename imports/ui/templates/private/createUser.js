import './createUser.html';

//create user
Template.createUser.events({
    'submit form': function (event) {
        event.preventDefault();
       
        let user = {
            username: event.target.email.value,
            email: event.target.email.value,
            password: event.target.password.value
          };
          
        Accounts.createUser(user, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Meteor.call('sendVerificationLink', (error, response) => {
                    if (error) {
                        Bert.alert(error.reason, 'danger');
                    } else {
                        Bert.alert('User and verification mail created', 'success');
                    }
                });
            }
        });
    }
});