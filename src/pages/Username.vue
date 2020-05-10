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
            <h3 id="HowToUse">
                How To Use
            </h3>

            <pre>
                <code class="hljs html"><span
                        class="hljs-comment">&lt;!-- How to us it in HTML --&gt;</span><br><br><span class="tag">&lt;AutoComplete uri='URI' keyMatch="MATCH_CASE" /&gt;</span></code>
            </pre>
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
            <AutoComplete
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
            <h3 id="Props">
                Props
            </h3>

            <pre>
                <code class="hljs html"><span class="hljs-comment">&lt;!-- Used Props --&gt;</span><br><br><span
                        class="tag">&lt;AutoComplete <br>   uri='http://www.mocky.io/v2/5eb814fe2d00008600357be1'<br>   keyMatch='username'<br>   v-bind:maxInputTags=2<br>   v-bind:requestDelay=1000<br>/&gt;</span></code>
            </pre>
        </section>
    </article>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AutoComplete from '../components/auto-complete';

    @Component({
        components: {
            AutoComplete
        }
    })
    export default class Username extends Vue {
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }
</style>
