<template>
    <div class="row justify-content-center align-items-center" style="height:70vh">
        <div class="col-6">
            <div class="card">
                <div class="card-header">
                    <h4>Login</h4>
                </div>
                <div class="card-body">
                    <form action="" autocomplete="off" id="form">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input id="username" type="text" v-model="username" required autofocus class="form-control"
                                   v-bind:class="{ 'border-danger': !isUserNameValid }">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input id="password" type="password" v-model="password" required class="form-control"
                                   v-bind:class="{ 'border-danger': !isPasswordValid }">
                        </div>
                        <button type="button" id="login" class="btn btn-primary btn-block" v-on:click="handleSubmit">
                            login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",

        data() {
            return {
                username: '',
                password: '',
                pattern: {
                    username: /\S+@\S+\.\S+/,
                },
            }
        },

        computed: {
            isUserNameValid() {
                // return this.username.match(this.pattern.username) || this.username.trim()=== '';
                return this.username.trim() === '';
            },
            isPasswordValid() {
                // return this.password.trim().length > 6 || this.password.trim()=== '';
                return this.password.trim() === '';
            }
        },

        methods: {
            validateForm() {
                return this.isUserNameValid && this.isPasswordValid;
            },

            handleSubmit(e) {
                e.preventDefault();

                if (!this.validateForm()) {
                    return;
                }

                localStorage.setItem('user', JSON.stringify({username: this.username}));
                //return router.replace('/');
                return window.location.href = '/';
            }
        }
    };
</script>
