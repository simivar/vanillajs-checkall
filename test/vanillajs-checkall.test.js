'use strict';

let checkAll = require('../src/vanillajs-checkall.js');

function initCheckAll(){
    checkAll(
        document.getElementById('master'),
        document.getElementsByClassName('slave')
    );
}

describe('master checkbox functionality', () => {
    test('should check all the slaves on master click', () => {
        document.body.innerHTML = '<input id="master" type="checkbox" name="master" />' +
            '<input class="slave" type="checkbox" name="slave1" />' +
            '<input class="slave" type="checkbox" name="slave2" />';

        initCheckAll();

        document.getElementById('master').click();

        let $slaves = document.getElementsByClassName('slave');
        for (let $slave of $slaves) {
            expect($slave.checked).toBe(true);
        }
    });

    test('should uncheck all the slaves on master click', () => {
        document.body.innerHTML = '<input id="master" type="checkbox" name="master" checked="checked" />' +
            '<input class="slave" type="checkbox" name="slave1" />' +
            '<input class="slave" type="checkbox" name="slave2" />';

        initCheckAll();

        document.getElementById('master').click();

        let $slaves = document.getElementsByClassName('slave');
        for (let $slave of $slaves) {
            expect($slave.checked).toBe(false);
        }
    });
});

describe('slaves checkboxes functionality', function () {
    test('should check the master if all slaves checked', () => {
        document.body.innerHTML = '<input id="master" type="checkbox" name="master" />' +
            '<input class="slave" type="checkbox" name="slave1" />' +
            '<input class="slave" type="checkbox" name="slave2" checked="checked" />';

        initCheckAll();

        document.getElementsByName('slave1')[0].click();
        expect(document.getElementById('master').checked).toBe(true);
    });

    test('should uncheck the master if at least slave unchecked', () => {
        document.body.innerHTML = '<input id="master" type="checkbox" name="master" checked="checked" />' +
            '<input class="slave" type="checkbox" name="slave1" checked="checked" />' +
            '<input class="slave" type="checkbox" name="slave2" checked="checked" />';

        initCheckAll();

        document.getElementsByName('slave1')[0].click();
        expect(document.getElementById('master').checked).toBe(false);
    });
});