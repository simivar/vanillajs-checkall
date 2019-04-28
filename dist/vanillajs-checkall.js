(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.checkAll = factory();
    }
}(typeof window !== 'undefined' ? window : global, (function () {
    'use strict';

    let checkedSlavesCounter = 0,
        $master,
        $slaves;

    function isValidElement($element) {
        if (!($element instanceof HTMLInputElement) || $element.type !== 'checkbox') {
            throw 'Could NOT find $master or $master is not a checkbox.';
        }
    }

    function handleMasterState() {
        if (checkedSlavesCounter === $slaves.length) {
            $master.checked = true;
            return;
        }

        $master.checked = false;
    }

    function initSlavesHandler() {
        for (let $slave of $slaves) {
            isValidElement($slave);

            if ($slave.checked) {
                checkedSlavesCounter += 1;
            }
            $slave.addEventListener('click', (function () {
                if (this.checked) {
                    checkedSlavesCounter += 1;
                } else {
                    checkedSlavesCounter -= 1;
                }

                handleMasterState();
            }));
        }
    }

    function initMasterHandler() {
        isValidElement($master);

        $master.addEventListener('click', (function () {
            if (this.checked) {
                checkedSlavesCounter = $slaves.length;
            } else {
                checkedSlavesCounter = 0;
            }

            for (let $slave of $slaves) {
                $slave.checked = this.checked;
            }
        }));
    }

    return {
        init: function (master, slaves) {
            $master = master;
            $slaves = slaves;

            initSlavesHandler();
            initMasterHandler();
        }
    };
})));
