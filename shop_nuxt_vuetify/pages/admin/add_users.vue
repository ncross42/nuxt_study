<template>
  <form @submit.prevent="submit" action="/api1/admin/clothes/registry" method="post">
    <v-select
      v-model="role"
      :items="roles"
      :error-messages="roleErrors"
      @change="$v.role.$touch()"
      @blur="$v.role.$touch()"
      label="Role"
      required
    />
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
      label="Name"
      required
    />
    <v-text-field
      v-model="pass"
      :error-messages="passErrors"
      @input="$v.pass.$touch()"
      @blur="$v.pass.$touch()"
      type="password"
      label="Password"
      required
    />
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
      label="E-mail"
      required
    />
    <v-text-field
      v-model="balance"
      :error-messages="balanceErrors"
      @input="$v.balance.$touch()"
      @blur="$v.balance.$touch()"
      label="Balance"
      required
    />
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
      label="Do you agree?"
      required
    />

    <v-btn :disabled="submitStatus === 'PENDING'" @click="submit" type="submit">
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script>
import { required, minLength, maxLength, email, between, numeric } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    name: '',
    role: null,
    email: '',
    pass: '',
    balance: 0,
    roles: [
      'admin',
      'customer',
    ],
    checkbox: false,
    submitStatus: null
  }),

  validations: {
    role: { required },
    name: { required, minLength: minLength(2), maxLength: maxLength(10) },
    pass: {
      required,
      minLength: minLength(4),
      strongPassword(pass) {
        return (
          /[a-z]/.test(pass) && // checks for a-z
          /[0-9]/.test(pass) && // checks for 0-9
          /\W|_/.test(pass) // checks for special char
        )
      }
    },
    email: { required, email },
    balance: { required, numeric, between: between(1000, 100000) },
    checkbox: {
      checked(val) {
        return val
      }
    }
  },

  computed: {
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    roleErrors() {
      const errors = []
      if (!this.$v.role.$dirty) return errors
      !this.$v.role.required && errors.push('Item is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      !this.$v.name.minLength && errors.push('Name must be at least 2 characters long')
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      return errors
    },
    passErrors() {
      const errors = []
      if (!this.$v.pass.$dirty) return errors
      !this.$v.pass.required && errors.push('Password is required.')
      !this.$v.pass.minLength && errors.push('Password must be at least 4 characters long')
      !this.$v.pass.strongPassword && errors.push('Strong passwords need to have a letter, a number, a special character')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('E-mail is required')
      !this.$v.email.email && errors.push('Must be valid e-mail')
      return errors
    },
    balanceErrors() {
      const errors = []
      if (!this.$v.balance.$dirty) return errors
      !this.$v.balance.required && errors.push('Balance is required.')
      !this.$v.balance.numeric && errors.push('Balance must be number')
      !this.$v.balance.between && errors.push('Balance must be between 1000 and 100000')
      return errors
    },
  },

  methods: {
    async submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        const param = {
          name: this.name,
          pass: this.pass,
          email: this.email,
          balance: this.balance,
          role: this.role
        }

        try {
          const ret = await this.$axios.$post('/api1/users/registry', param)
          console.log('ret', ret)
          if (ret.status === 200 && ret.data.message === 'ok') {
            this.submitStatus = 'OK'
            this.clear()
          } else {
            this.submitStatus = 'ERROR'
          }
        } catch (error) {
          this.submitStatus = 'ERROR'
          console.error('axios.error.response.data', error.response.data)
        }
      }
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.role = null
      this.checkbox = false
    }
  }
}
</script>
