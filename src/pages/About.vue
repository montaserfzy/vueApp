<template>
    <article>
        <section>
            <h2>
                About Auto Complete VueJs
            </h2>
            <div>
                <blockquote>
                    <Strong>Auto complete</Strong> widgets provides suggestions as following:
                </blockquote>
                <div class='list-group'>
                    <ul class="d-flex flex-column">
                        <li class="list-group-item">While user type into the field. showing list for the suggestions result</li>
                        <li class="list-group-item">Have dynamic get url</li>
                        <li class="list-group-item">Have dynamic response delay timeout</li>
                        <li class="list-group-item">Have dynamic response data key match</li>
                        <li class="list-group-item">User can select one item by clicking on it</li>
                        <li class="list-group-item">User can move on the items by arrow up and down</li>
                        <li class="list-group-item">User can select item from the drop down list by clicking on it or click on enter</li>
                        <li class="list-group-item">User can select the input value by clicking enter</li>
                        <li class="list-group-item">User can remove item by re clicking on selected item/tag or click on backspace</li>
                        <li class="list-group-item">Close list by clicking out of the auto complete widget</li>
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
                <code class="hljs html"><span class="hljs-comment">&lt;!-- How to use --&gt;</span><br><br><span class="tag">import auto-complete from '../components/AutoComplete';</span><br><br><span
                        class="tag">&lt;auto-complete <br>   uri='http://www.mocky.io/v2/5eb814fe2d00008600357be1'<br>   keyMatch='username'<br>   :maxInputTags=2<br>   :requestDelay=1000<br>/&gt;</span></code>
            </pre>
        </section>
    </article>
</template>

<script>
    export default {
        name: "About.vue"
    }
</script>
