<template>
    <article>
        <section>
            <h2>
                About Auto Complete VueJs
            </h2>
            <div>
                <blockquote>
                    <Strong>Auto complete</Strong> widget provides suggestions as following:
                </blockquote>
                <div class='list-group'>
                    <ul class="d-flex flex-column">
                        <li class="list-group-item">While user type into the field. showing list for the suggestions
                            result
                        </li>
                        <li class="list-group-item">Have dynamic get url</li>
                        <li class="list-group-item">Have dynamic response delay timeout</li>
                        <li class="list-group-item">Have dynamic response data key match</li>
                        <li class="list-group-item">User can select any item by clicking on it or moving to it by arrow
                            up and down and click enter
                        </li>
                        <li class="list-group-item">User can move on the items by arrow up and down</li>
                        <li class="list-group-item">User can select the input value by clicking enter</li>
                        <li class="list-group-item">User can remove item by click on selected item/tag or click on
                            backspace
                        </li>
                        <li class="list-group-item">Close list by clicking out of the auto complete widget</li>
                        <li class="list-group-item">On waiting time spinner loader coming up</li>
                        <li class="list-group-item">More tags exceed the limit grouped one tag and show total items
                            number
                        </li>
                        <li class="list-group-item">Item hovering background color is <code>#2398ff05</code></li>
                        <li class="list-group-item">Arrow up and down change the background color to
                            <code>#eeeeee</code></li>
                        <li class="list-group-item">Selected item in drop down list have left border <code>2px solid
                            #42b983</code></li>
                    </ul>
                </div>
            </div>
        </section>
        <hr>
        <section class="mb-5">
            <div>
                <blockquote>
                    <Strong>Auto complete</Strong> props:
                </blockquote>
                <div class='list-group'>
                    <ul class="d-flex flex-column">
                        <li class="list-group-item"><code>uri</code> string and required</li>
                        <li class="list-group-item"><code>keyMatch</code> string and required</li>
                        <li class="list-group-item"><code>maxInputTags</code> number and optional, default 2</li>
                        <li class="list-group-item"><code>requestDelay</code> number and optional, default 100 ms</li>
                    </ul>
                </div>
            </div>
        </section>
        <hr>
        <section>
            <blockquote>
                <Strong>Auto complete</Strong> usage:
            </blockquote>

            <pre>
                <code class="hljs html"><span class="hljs-comment">&lt;!-- How to use --&gt;</span><br><br><span
                        class="tag">import auto-complete from '../components/AutoComplete';</span><br><br><span
                        class="tag">&lt;auto-complete <br>   uri='http://www.mocky.io/v2/5eb814fe2d00008600357be1'<br>   keyMatch='username'<br>   :maxInputTags=2<br>   :requestDelay=1000<br>/&gt;</span></code>
            </pre>
        </section>
        <hr>
        <section class="mb-5">
            <blockquote>
                <Strong>Auto complete</Strong> TODO:
            </blockquote>
            <div class='list-group'>
                <ul class="d-flex flex-column">
                    <li class="list-group-item">Make the widget more dynamic by adding more props for coloring, spinner DOM, keys, ...etc.</li>
                    <li class="list-group-item">Adding validation on input value.</li>
                    <li class="list-group-item">Adding animation to drop down list and select un select item</li>
                    <li class="list-group-item">Adding description on user input value if the value is already selected.</li>
                    <li class="list-group-item">Showing button to save selection values and retrieve it any time.</li>
                    <li class="list-group-item">Build it as a package to be able to used any where.</li>
                    <li class="list-group-item">Adding avatar image and item description dom on demand</li>
                </ul>
            </div>

        </section>
    </article>
</template>

<script>
    export default {
        name: "About.vue"
    }
</script>
