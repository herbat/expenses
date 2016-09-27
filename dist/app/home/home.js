/*jshint unused:false*/

(function() {
    'use strict';
    var list   = require('../dist/js/list'),
        insert = require('../dist/js/insert'),
        remove = require('../dist/js/remove'),
        heads  = ['shop', 'type', 'details', 'sum', 'date'],
        app    = angular.module('Home', []);

    app.controller('ListController', ['$scope', ListController]);
    app.controller('TabController' , ['$scope', TabController ]);
    app.controller('FormController', ['$scope', FormController]);

    function ListController($scope) {
        this.heads = heads;
        this.ids   = [];
        this.queryIn = '';
        this.queryOut = {};

        this.refresh = () => {
            list(this.queryOut, this.heads.concat('_id'), res => {this.rows = res; $scope.$apply(); });
        };

        this.remove = (id) => {
            remove(id, () => {
                this.refresh();
            });
        };

        this.edit = (id) => {
            console.log(id);
            this.refresh();
        };

        this.processQuery = () => {
            var res = {};
            res[this.queryIn.match(/[^:]*/)] = {
                $text:
                {
                    $search: this.queryIn.match(/[^:]*$/)[0],
                    $language: "none",
                    $caseSensitive: false
                }
            };
            if(this.queryIn.length === 0) {res = undefined;}
            console.log(res);
            this.queryOut = res;
            this.refresh();
        };
        //filter out IDs
        $scope.noIds = (item) => {
            return typeof item === 'string';
        };
        //Refresh when tabs are switched
        $scope.$on('tabSwitch', (event, t) => {
            this.refresh();
        });
    }

    function TabController ($scope) {
        this.tab = 1;
        //Switch the tab
        this.setTab = (t) => {
            this.tab = t;
            $scope.$broadcast('tabSwitch', t);
        };
        this.isActive = (t) => {
            return this.tab === t;
        };
    }

    function FormController ($scope) {
        this.input = {};
        this.success = false;
        //Validate form
        this.valid = () => {
            var that = this;
            return heads.reduce((prev, cur) => prev && that.input[cur], true);
        };
        //Submit form
        this.submit = () => {
            insert(this.input, () => {
                console.log('inserted');
                this.success = true;
                setTimeout(() => {this.success = false;}, 3000);
            });
            this.input = {};
        };
    }
})();
