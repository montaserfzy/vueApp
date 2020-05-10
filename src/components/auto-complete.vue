<template>
    <div class="form-group">
        <div class="auto-complete"
             v-bind:class="{'open-drop-down': isListActive}"
             v-handle-click-outside="handelOnOutSideClick"
             v-on:click="_updateInput"
        >
            <div class="auto-complete-input">
                <label v-for="tag in tags"
                       class="tag"
                       v-on:click="handelUnSelectItem(tag)"
                       v-bind:class="{'danger': !tag.formatted}"
                >
                    {{tag[keyMatch]}}
                </label>
                <label class="more"
                       v-if="isMore">
                    more {{getTotalMoreItems}}
                </label>

                <input autofocus="true"
                       type="text"
                       ref="inputRef"

                       :placeholder="'Enter ' +[[ keyMatch ]]"

                       v-model="value"
                       v-on:click="handelOnInputClicked"

                       v-on:keydown.38="handelOnArrowUp"
                       v-on:keydown.40="handelOnArrowDown"

                       v-on:input="handelSearch"
                       v-on:keydown.13="handelOnInputEnter"
                       v-on:keydown.8="handelOnBackSpace"
                />
            </div>
            <div class="auto-complete-dropdown">
                <PulseLoader
                        color="#e1567c"
                        :loading="isLoading"
                        v-bind:style="spinnerStyle"></PulseLoader>
                <ul ref="scrollContainer"
                    id="auto_complete_list"
                    v-bind:class="{'active': !isLoading}"
                >
                    <li v-for="item in items"
                        :key="item[keyMatch]"
                        v-on:click="handelSelectItem(item)"
                        v-bind:class="{'selected':item.isSelected, 'active':item.isActive}"
                    >
                        <p>{{ item[keyMatch] }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from '../providers/request';
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


    export default {
        name: "AutoComplete",

        props: {
            uri: {
                type: String,
                required: true
            },
            keyMatch: {
                type: String,
                required: true
            },
            maxInputTags: {
                type: Number,
                default: 5
            },
            requestDelay: {
                type: Number,
                default: 100
            }
        },

        data() {
            return {
                tags: [],
                items: [],
                value: "",
                inputHasFocus: false,
                loading: false,
                tempTags: [],
                requestTimeout: null,
                spinnerStyle: {
                    height: 20,
                    width: 40,
                    margin: '30px auto',
                }
            }
        },
        components: {
            'PulseLoader': PulseLoader
        },
        computed: {
            isListActive() {
                return this.items.length !== 0 || this.isLoading;
            },
            validateValue() {
                return this.value.trim().length !== 0;
            },
            getValue() {
                return this.value.trim()
            },
            getTotalMoreItems() {
                return this.tempTags.length
            },
            isMore() {
                return this.tempTags.length !== 0;
            },
            isLoading() {
                return this.loading || false
            }
        },
        methods: {

            /**
             * handel input on user click enter
             * @returns {*|void}
             */
            handelOnInputEnter() {
                if (!this.validateValue)
                    return;

                if (this._getActiveItemIndex() > -1) {
                    return this.handelSelectItem(this.items[this._getActiveItemIndex()]);
                }

                let object = new Object({
                    formatted: false
                });
                object[this.keyMatch] = this.getValue;
                this.setTagItem(object);
                this.value = '';
            },

            /**
             * handel input on user click backspace to remove
             * @returns {*|void}
             */
            handelOnBackSpace() {
                if (this.validateValue)
                    return;

                this.tags.pop();
                this._updateInput();
            },

            /**
             * handel un select item
             * @param unSelectedItem
             */
            handelUnSelectItem(unSelectedItem) {
                const keyMatch = this.keyMatch;
                const keyMatchValue = unSelectedItem[keyMatch];

                this.items = this.items.map(function (item) {
                    if (item[keyMatch] === keyMatchValue) {
                        item.isSelected = false;
                    }
                    return item;
                });

                this.tags = this.tags.filter(tag => tag[keyMatch] !== keyMatchValue);
                this._updateInput();
            },

            /**
             * handel select new item
             * @param selectedItem
             */
            handelSelectItem(selectedItem) {
                const keyMatch = this.keyMatch;
                const keyMatchValue = selectedItem[keyMatch];

                this.items = this.items.map(function (item) {
                    if (item[keyMatch] === keyMatchValue && !item.isSelected) {
                        item.isSelected = true;
                        this.setTagItem({...selectedItem, formatted: true});
                    }
                    return item;
                }.bind(this));
            },

            /**
             * handel search on user input value
             * @returns {Array} of items
             */
            handelSearch() {

                // check is user input valid value
                if (!this.validateValue)
                    return this.items = [];

                // show loader
                this.loading = true;

                // create request if needed
                const buildRequest = () => {
                    //https://www.mocky.io/
                    const request = axios.get(this.uri);

                    // done
                    request.then(({data}) => {
                        this.items = data.filter(result => {
                            return result[this.keyMatch].search(this.getValue) >= 0;
                        });
                    });

                    // fail
                    request.catch(error => {
                        console.log('Request Error', error);
                    });

                    // always
                    request.finally(() => {
                        setTimeout(function () {
                            this.loading = false;
                        }.bind(this), 500);
                        clearTimeout(this.requestTimeout);
                    });
                }

                // set request timer
                this.requestTimeout = setTimeout(buildRequest, this.requestDelay);
            },

            /**
             * handel the event on user click out to close the drop down list
             * @param event
             */
            handelOnOutSideClick(event) {
                this.items = [];
                this.tempTags = this.tags.splice(this.maxInputTags);
            },

            /**
             * handel the event on user click on input
             * @param event
             */
            handelOnInputClicked(event) {
                event.preventDefault();

                if (!this.isMore)
                    return;

                this.tags = this.tags.concat(this.tempTags);
                this.tempTags = [];
            },

            /**
             * handel event on user click arrow up to moving active item in list to up
             * @param event
             */
            handelOnArrowUp(event) {
                event.preventDefault();

                let itemIndex = this._getActiveItemIndex();
                let nextItemIndex = itemIndex < 0 ? 0 : itemIndex - 1; // next item up

                this._updateList(itemIndex, nextItemIndex);
            },

            /**
             * handel event on user click arrow down to moving active item in list to down
             * @param event
             */
            handelOnArrowDown(event) {
                event.preventDefault();

                if (!this.items.length)
                    return;

                let itemIndex = this._getActiveItemIndex();
                let nextItemIndex = itemIndex > this.items.length ? 0 : itemIndex + 1; // next item down

                this._updateList(itemIndex, nextItemIndex);
            },

            /**
             * handel set new item in tags list
             * @param tag
             */
            setTagItem(tag) {
                this.tags.push(tag);
                this._updateInput();
            },

            /**
             * handel updating list items active or not active by item index in array
             * @param itemIndex
             * @param nextItemIndex
             * @returns {*|void}
             * @private
             */
            _updateList(itemIndex, nextItemIndex) {
                let currentItem = this.items[itemIndex];
                let nextItem = this.items[nextItemIndex];

                if (nextItemIndex === 0) {
                    return this._updateItem(nextItem, {...nextItem, isActive: true});
                }

                this._updateItem(currentItem, {...currentItem, isActive: false});
                this._updateItem(nextItem, {...nextItem, isActive: true});
                this._updateItemScrolling();
            },

            /**
             * remove active item from the list
             * @private
             */
            _removeActiveItem() {
                let activeItem = this.items.find((item, index) => {
                    if (item.isActive === true) {
                        return {
                            ...item,
                            index
                        }
                    }
                });

                if (activeItem)
                    this.items.splice(activeItem.index, 1, {...activeItem, isActive: false});
            },

            /**
             * update the item object values
             * @param targetItem
             * @param updatedItem
             * @private
             */
            _updateItem(targetItem, updatedItem) {
                this.items.splice(this._getItemIndex(targetItem), 1, updatedItem)
            },

            /**
             * function to get the active item in the list
             * @returns {number}
             * @private
             */
            _getActiveItemIndex() {
                return this.items.findIndex(item => item.isActive);
            },

            /**
             * function to get the item index by object
             * @param item
             * @returns {number}
             * @private
             */
            _getItemIndex(item) {
                let index = this.items.indexOf(item);
                return index < 0 ? 0 : index;
            },

            /**
             * function to update the input focus or un focus
             * @param isFocus
             * @returns {*}
             * @private
             */
            _updateInput(isFocus = true) {
                if (isFocus)
                    return this.$refs.inputRef.focus();

                return this.$refs.inputRef.blur();
            },

            /**
             * function to update the scrolling on the dropdown list when user moving the arrow down or up
             * @private
             */
            _updateItemScrolling() {
                let activeItem = document.querySelector('#auto_complete_list').querySelector('li.active');
                if (activeItem)
                    activeItem.scrollIntoView({behavior: "auto", block: "center", inline: "nearest"});
            },
        },
        directives: {
            'handle-click-outside': {
                bind: function (el, binding) {
                    const {bubble} = binding.modifiers;
                    const clickHandler = (e) => {
                        if (bubble || (!el.contains(e.target) && el !== e.target)) {
                            binding.value(e)
                        }
                    };
                    el.__vueHandleClickOutside__ = clickHandler;
                    document.addEventListener('click', clickHandler)
                },

                unbind: function (el) {
                    document.removeEventListener('click', el.__vueHandleClickOutside__);
                    el.__vueHandleClickOutside__ = null;
                }
            },
        }
    }
</script>

<style scoped>

</style>
