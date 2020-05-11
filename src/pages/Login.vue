<template>
    <div>
        <div class="row justify-content-center align-items-center" style="height:70vh">
            <div class="col-6">
                <div class="card">
                    <div class="card-header">
                        <h4>Login</h4>
                    </div>
                    <div class="card-body">
                        <form action="" autocomplete="off" id="form">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input id="email" type="email" v-model="email" required autofocus class="form-control" v-bind:class="{ 'border-danger': !isEmailValid }">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input id="password" type="password" v-model="password" required class="form-control" v-bind:class="{ 'border-danger': !isPasswordValid }">
                            </div>
                            <button type="button" id="login" class="btn btn-primary btn-block" v-on:click="handleSubmit">
                                login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import router from "../routes";

    export default {
        name: "Login",

        data() {
            return {
                email: "",
                password: "",
                pattern: {
                    email: /\S+@\S+\.\S+/,
                },
            }
        },

        computed:{
            isEmailValid(){
                return this.email.match(this.pattern.email) || this.email.trim()=== '';
            },
            isPasswordValid(){
                return this.password.trim().length > 6 || this.password.trim()=== '';
            }
        },

        methods: {
            validateForm() {
                return this.isEmailValid && this.isPasswordValid;
            },
            handleSubmit(e) {
                e.preventDefault();

                if(!this.validateForm()){
                    return;
                }

                localStorage.setItem('user', JSON.stringify({email:this.email}));
                //return router.replace('/');
                return window.location.href = '/';
            }
        }
    };
</script>
