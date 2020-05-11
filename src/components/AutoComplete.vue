<template>
    <div class="form-group">
        <div class="auto-complete"
             v-bind:class="{'open-drop-down': isListActive}"
             v-handle-click-outside="handelOnOutSideClick"
             v-on:click="_updateInput"
        >
            <div class="auto-complete-input">
                <b-badge v-for="( tag, index ) in tags"
                         class="tag"
                         v-on:key="index"
                         v-on:click="handelUnSelectTag(tag)"
                         v-bind:variant="tag.formatted?'light':'danger'"
                >
                    {{tag[keyMatch]}}
                </b-badge>
                <b-badge variant="light"
                         class="more"
                         v-if="isMore"
                         v-on:click="handelOnInputClicked"
                >
                    more {{getTotalMoreItems}}
                </b-badge>

                <input autofocus
                       type="text"
                       ref="inputRef"
                       id="auto_complete_input"

                       v-model="value"
                       v-bind:placeholder="isTags?'':'Enter ' +[[ keyMatch ]]"
                       v-on:click="handelOnInputClicked"
                       v-on:input="handelSearch"
                       v-on:keydown.8="handelOnBackSpace"
                       v-on:keydown.13="handelOnInputEnter"
                       v-on:keydown.38="handelOnArrowUp"
                       v-on:keydown.40="handelOnArrowDown"
                />
            </div>
            <div class="auto-complete-dropdown">
                <b-spinner
                        v-bind:style="spinnerStyle"
                        v-if="isLoading"
                        label="Spinning">

                </b-spinner>
                <ul ref="scrollContainer"
                    id="auto_complete_list"
                    v-bind:class="{'active': !isLoading}"
                >
                    <li v-for="( item, index )  in items"
                        v-on:key="index"
                        v-on:click="toggleSelectedItem(item)"
                        v-bind:class="{'selected':item.isSelected, 'active':item.isActive}"
                    >
                        <p v-html="highlight(item[keyMatch])"></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from '../providers/request';

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
                    color: '#42b983'
                }
            }
        },

        computed: {
            isListActive() {
                return this.itemsLength !== 0 || this.isLoading;
            },
            itemsLength() {
                return this.items.length;
            },
            validateValue() {
                return this.value.trim().length !== 0;
            },
            getValue() {
                return this.value.toLocaleLowerCase().trim();
            },
            getTotalMoreItems() {
                return this.tempTags.length;
            },
            isMore() {
                return this.tempTags.length !== 0;
            },
            isLoading() {
                return this.loading || false;
            },
            isTags() {
                return this.tags.length !== 0;
            }
        },

        methods: {

            /**
             * handel text highlighted
             * @returns {string}
             */
            highlight(inputText) {
                if(!this.validateValue || !inputText)
                    return inputText;

                let text = this.getValue;
                let index = inputText.indexOf(text);
                if (index >= 0) {
                    inputText = inputText.substring(0, index)
                        + "<span class='highlight'>"
                        + inputText.substring(index, index + text.length)
                        + "</span>"
                        + inputText.substring(index + text.length);
                }
                return inputText;
            },

            /**
             * handel input on user click enter
             * @returns {*| void}
             */
            handelOnInputEnter() {

                // First: check if have active item in list
                if (this._getActiveItemIndex() > -1) {
                    return this.toggleSelectedItem(this.items[this._getActiveItemIndex()]);
                }

                // Second: check if the input value valid
                if (!this.validateValue)
                    return false;

                // Third: create new object with user input value
                let object = new Object({
                    formatted: false
                });

                object[this.keyMatch] = this.getValue;
                this.setTagItem(object);

                // Reset the input value
                this.value = '';
            },

            /**
             * handel input on user click backspace to remove
             * @returns {*|void}
             */
            handelOnBackSpace() {
                if (this.validateValue)
                    return;

                this.handelUnSelectTag(this.tags[this.tags.length -1]);
                this._updateInput();
            },

            /**
             * handel un select tagged item
             * @param unSelectedTagItem
             */
            handelUnSelectTag(unSelectedItem) {
                const keyMatch = this.keyMatch;
                const keyMatchValue = unSelectedItem[keyMatch];

                this.items = this.items.map(function (item) {
                    if (item[keyMatch] === keyMatchValue) {
                        item.isSelected = false;
                    }
                    return item;
                });

                this.unSetTagItem(unSelectedItem);
                this._updateInput();
            },

            /**
             * function to toggle item selected
             * @param selectedItem
             */
            toggleSelectedItem(selectedItem) {
                selectedItem.isSelected ? this.unSetTagItem(selectedItem) : this.setTagItem({
                    ...selectedItem,
                    formatted: true
                });

                this.items.splice(this._getItemIndex(selectedItem), 1, {
                    ...selectedItem,
                    isSelected: !selectedItem.isSelected
                });

                this._updateInput();
            },

            /**
             * handel search on user input value
             * @returns {Array|void} of items
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
                };

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

                this._removeActiveItem();

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

                if(nextItemIndex < 0)
                    return ;

                this._updateList(itemIndex, nextItemIndex);
            },

            /**
             * handel event on user click arrow down to moving active item in list to down
             * @param event
             */
            handelOnArrowDown(event) {
                event.preventDefault();

                if (!this.itemsLength)
                    return;

                let itemIndex = this._getActiveItemIndex();
                let nextItemIndex = itemIndex > this.itemsLength ? 0 : itemIndex + 1; // next item down

                if(nextItemIndex >= this.itemsLength)
                    return ;

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
             * handel unset tag remove item from the tas list and items list
             * @param selectedTag
             */
            unSetTagItem(selectedTag) {
                let index = this.tags.findIndex(tag => tag[this.keyMatch] === selectedTag[this.keyMatch]);
                this.tags.splice(index, 1);
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

                if (nextItemIndex < 0) {
                    return this._resetActiveItem();
                }

                this._updateItem(currentItem, {...currentItem, isActive: false});
                this._updateItem(nextItem, {...nextItem, isActive: true});
                this._updateItemScrolling();
            },

            /**
             * reset active item from the list to first item in list
             * @private
             */
            _resetActiveItem() {
                this._updateItem(this.items[1], {...this.items[1], isActive: false});
                this._updateItem(this.items[0], {...this.items[0], isActive: true});
                this._updateItemScrolling();
            },

            /**
             * remove active item from the list
             * @private
             */
            _removeActiveItem() {
                const activeItemIndex = this._getActiveItemIndex();

                if(activeItemIndex < 0)
                    return;

                this._updateItem(this.items[activeItemIndex], {...this.items[activeItemIndex], isActive: false});
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

            /**
             * directive to handel user click out of the auto complete box
             * @directive
             */
            'handle-click-outside': {
                bind: function (el, binding) {
                    const {bubble} = binding.modifiers;
                    const clickHandler = (e) => {
                        if (bubble || (!el.contains(e.target) && el !== e.target)) {
                            binding.value(e)
                        }
                    };
                    el.__vueHandleClickOutside__ = clickHandler;
                    document.addEventListener('click', clickHandler, true)
                },

                unbind: function (el) {
                    document.removeEventListener('click', el.__vueHandleClickOutside__);
                    el.__vueHandleClickOutside__ = null;
                }
            },
        }
    }
</script>
