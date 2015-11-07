!function(){var a=angular.module("mainApp",["ui.router","LocalStorageModule"]);a.config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/authorized"),a.state("authorized",{url:"/authorized",templateUrl:"/templates/authorized.html",controller:"AuthorizedController"}).state("home",{"abstract":!0,url:"/home",templateUrl:"/templates/home.html"}).state("overview",{parent:"home",url:"/overview",templateUrl:"/templates/overview.html",controller:"OverviewController",resolve:{DataEventRecordsService:"DataEventRecordsService",dataEventRecords:["DataEventRecordsService",function(a){return a.GetDataEventRecords()}]}}).state("details",{parent:"overview",url:"/details/:id",templateUrl:"/templates/details.html",controller:"DetailsController",resolve:{DataEventRecordsService:"DataEventRecordsService",dataEventRecord:["DataEventRecordsService","$stateParams",function(a,b){var c=b.id;return console.log(b.id),a.GetDataEventRecord({id:c})}]}}).state("create",{parent:"overview",url:"/create",templateUrl:"/templates/create.html",controller:"DetailsController",resolve:{dataEventRecord:[function(){return{Id:"",Name:"",Description:"",Timestamp:"2015-08-28T09:57:32.4669632"}}]}}),c.html5Mode(!0)}]),a.run(["$rootScope",function(a){a.$on("$stateChangeError",function(a,b,c,d,e,f){console.log(a),console.log(b),console.log(c),console.log(d),console.log(e),console.log(f)}),a.$on("$stateNotFound",function(a,b,c,d){console.log(a),console.log(b),console.log(c),console.log(d)})}])}(),function(){"use strict";function a(a,b,c,d){b.info("AuthorizedController called"),a.message="AuthorizedController created";var e=c.get("authorizationData");if(e)a.message="AuthorizedController created logged on";else if(window.location.hash)console.log(window.location.hash);else{a.message="AuthorizedController time to log on",c.remove("authorizationData");var f="https://localhost:44300/connect/authorize",g="angularclient",h="https://localhost:44302/authorized",i="token",j="dataEventRecords",k=Date.now()+""+Math.random();c.set("state",k);var l=f+"?client_id="+encodeURI(g)+"&redirect_uri="+encodeURI(h)+"&response_type="+encodeURI(i)+"&scope="+encodeURI(j)+"&state="+encodeURI(k);window.location=l}}var b=angular.module("mainApp");b.controller("AuthorizedController",["$scope","$log","localStorageService","$window",a])}(),function(){"use strict";function a(a,b,c,d,e){b.info("DetailsController called"),a.message="dataEventRecord Create, Update or Delete",a.DataEventRecordsService=d,a.state=e,a.dataEventRecord=c,a.Update=function(){b.info("Updating"),b.info(c),a.DataEventRecordsService.UpdateDataEventRecord(c),a.state.go("overview")},a.Create=function(){b.info("Creating"),b.info(c),a.DataEventRecordsService.AddDataEventRecord(c),a.state.go("overview")}}var b=angular.module("mainApp");b.controller("DetailsController",["$scope","$log","dataEventRecord","DataEventRecordsService","$state",a])}(),function(){"use strict";function a(a,b,c,d){b.info("OverviewController called"),a.message="Overview",a.DataEventRecordsService=d,b.info(c),a.dataEventRecords=c,a.Delete=function(c){b.info("deleting"),a.DataEventRecordsService.DeleteDataEventRecord(c)}}var b=angular.module("mainApp");b.controller("OverviewController",["$scope","$log","dataEventRecords","DataEventRecordsService",a])}(),function(){"use strict";function a(a,b,c){console.log("AuthorizationInterceptor created");var d=function(a){a.headers=a.headers||{};var d=c.get("authorizationData");return d&&(a.headers.Authorization="Bearer "+d),a||b.when(a)},e=function(a){if(console.log("console.log(responseFailure);"),console.log(a),403===a.status)window.location.href="/#/unauthorized";else if(401===a.status){c.remove("authorizationData");var b="https://localhost:44300/connect/authorize",d="angularclient",e="https://localhost:44302/authorized.html",f="token",g="dataEventRecords",h=Date.now()+""+Math.random();c.set("state",h);var i=b+"?client_id="+encodeURI(d)+"&redirect_uri="+encodeURI(e)+"&response_type="+encodeURI(f)+"&scope="+encodeURI(g)+"&state="+encodeURI(h);window.location=i}return this.q.reject(a)};return{request:d,responseError:e}}var b=angular.module("mainApp");b.service("authorizationInterceptor",["$rootScope","$q","localStorageService",a]),b.config(["$httpProvider",function(a){a.interceptors.push("authorizationInterceptor")}])}(),function(){"use strict";function a(a,b,c){b.info("DataEventRecordsService called");var d="https://localhost:44303",e=function(b){var e=c.defer();return console.log("addDataEventRecord started"),console.log(b),a({url:d+"api/DataEventRecords",method:"POST",data:b}).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},f=function(b){var e=c.defer();return console.log("addDataEventRecord started"),console.log(b),a({url:d+"api/DataEventRecords/"+b.Id,method:"PUT",data:b}).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},g=function(b){var e=c.defer();return console.log("DeleteDataEventRecord begin"),console.log(b),a({url:d+"api/DataEventRecords/"+b,method:"DELETE",data:""}).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},h=function(){b.info("DataEventRecordService DataEventRecords called");var e=c.defer();return console.log("addDataEventRecord started"),console.log(dataEventRecord),a({url:d+"api/DataEventRecords",method:"GET",data:dataEventRecord}).success(function(a){e.resolve(a)}).error(function(a){e.reject(a)}),e.promise},i=function(c){return b.info("DataEventRecordService GetDataEventRecord called: "+c.id),b.info(c),a({url:d+"/api/DataEventRecords/"+c.id,method:"GET",data:dataEventRecord}).success(function(a){deferred.resolve(a)}).error(function(a){deferred.reject(a)}),deferred.promise};return{AddDataEventRecord:e,UpdateDataEventRecord:f,DeleteDataEventRecord:g,GetDataEventRecords:h,GetDataEventRecord:i}}var b=angular.module("mainApp");b.factory("DataEventRecordsService",["$http","$log","$q",a])}();