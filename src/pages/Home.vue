<template>
    <article>
        <section>
            <h2>
                Auto Complete VueJs
            </h2>
            <blockquote>
                This field auto complete, <br/><br/>configurable use vue js props required and optional props
            </blockquote>
        </section>
        <br>
        <section>
            <h3 id="Example">
                Example
            </h3>
            <blockquote>
                AutoComplete field used to search by email
            </blockquote>
            <br>
            <br>
            <auto-complete
                    id="auto_complete"
                    uri='http://www.mocky.io/v2/5eb6ff46310000fe3bc8a0e3'
                    keyMatch="email"
                    v-bind:maxInputTags=2
                    v-bind:requestDelay=1000
            />
        </section>
    </article>
</template>

<script>
    import {Component, Vue} from 'vue-property-decorator';
    import AutoComplete from '../components/AutoComplete';

    @Component({
        components: {
            'auto-complete': AutoComplete,
        }
    })

    export default class Home extends Vue {

    }
</script>
