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
                AutoComplete field used to search by username
            </blockquote>
            <br>
            <br>
            <auto-complete
                    id="auto_complete"
                    uri='http://www.mocky.io/v2/5eb814fe2d00008600357be1'
                    keyMatch="username"
                    v-bind:maxInputTags=2
                    v-bind:requestDelay=500
            />
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
