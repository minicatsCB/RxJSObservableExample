var button = document.querySelector('button');  // Reference to the button

var observer = {
	// Called when a new value is emitted by the Observable
	next: function(value){
  	console.log(value)
  },
  // Called when an error occurs
  error: function(error){
  	console.log(error)
  },
  // In this case, never call, because we can't tell if the user is going to click the button one more time
  complete: function(){
  	console.log('Completed');
  }
};

/*
 The subscribe method receives either a list of functions (next, error and complete) or
 a single object (see the observer object created before) that implements these methods
*/
//Rx.Observable.fromEvent(button, 'click')
//	.subscribe(observer);


/* Now, it takes a function that takes an observer as an argument
 WARNING: We are not passing it the observer object we declared before, it just says, hey,
 you are going to receive "something". Because of this, take care of the name of the argument!
*/
//Rx.Observable.create(function(obs) {
//	obs.next('A value');	// Emit a value
//  setTimeout(function(){
//  	obs.complete();
//  }, 2000);
//  obs.next('A second value');
//})
//	.subscribe(observer);
  
/*
We have seen an asynchronous observable, because now we have a data stream where we have two
synchrounous values being emitted inmediatly but then one event happening after two seconds
*/

// Returning to the button example
var suscription = Rx.Observable.create(function(obs){
	button.onclick = function(event) {
  	obs.next(event);
  }
})
	.subscribe(observer);
  
 /* We have subscribed to an observable, which takes a function, where the function takes the observer,
and our RxJS now passes our observer to the function and execute that function :D */
  
/* Important point: if we subscribe to this observable like this, keep in mind that this
specific observable it's an infinite one, because we never call complete method in this function.
We don't call it because of course we always want to listen to more click events.
If you have an observable which is never completed, that poses the danger of a memory leak, so you
should definitely unsubscribe to any subscriptions wich you don't need anymore */
setTimeout(function(){
  console.log('Unsubscribed!');
  suscription.unsubscribe();
} ,5000);
  
  
/* Reference: https://www.youtube.com/watch?v=Tux1nhBPl_w */
