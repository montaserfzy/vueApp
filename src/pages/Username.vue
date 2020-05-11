<template>
    <article>
        <section>
            <h2>
                Auto Complete VueJs
            </h2>
            <blockquote>
                This field auto complete, <br/><br/>configrable use vue js props required and optional props
            </blockquote>
        </section>
        <br>
        <br>
        <section>
            <h3 id="Example">
                Example
            </h3>
            <blockquote>
                AutoComplete field used to search by username
            </blockquote>
            <br>
            <br>
            <auto-complete
                    id="auto_complete"
                    uri='http://www.mocky.io/v2/5eb814fe2d00008600357be1'
                    keyMatch="username"
                    v-bind:maxInputTags=2
                    v-bind:requestDelay=1000
            />
        </section>
        <br>
        <br>
        <section>
            <h3 id="HowToUse">
                How To Use
            </h3>

            <pre>
                <code class="hljs html"><span
                        class="hljs-comment">&lt;!-- How to us it in HTML --&gt;</span><br><br><span class="tag">&lt;auto-complete uri='URI' keyMatch="MATCH_CASE" /&gt;</span></code>
            </pre>
        </section>

        <br>
        <br>

        <section>
            <h3 id="Props">
                Props
            </h3>

            <pre>
                <code class="hljs html"><span class="hljs-comment">&lt;!-- Used Props --&gt;</span><br><br><span class="tag">import auto-complete from '../components/AutoComplete';</span><br><br><span
                        class="tag">&lt;auto-complete <br>   uri='http://www.mocky.io/v2/5eb814fe2d00008600357be1'<br>   keyMatch='username'<br>   v-bind:maxInputTags=2<br>   v-bind:requestDelay=1000<br>/&gt;</span></code>
            </pre>
        </section>
    </article>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import AutoComplete from '../components/AutoComplete';

    @Component({
        components: {
            'auto-complete':AutoComplete
        }
    })
    export default class Username extends Vue {
    }
</script>
