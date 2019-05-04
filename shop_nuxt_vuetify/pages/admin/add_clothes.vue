<template>
  <form @submit.prevent="submit" action="/api1/clothes/registry" method="post">
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
      v-model="price"
      :error-messages="priceErrors"
      @input="$v.price.$touch()"
      @blur="$v.price.$touch()"
      label="Price"
      required
    />
    <v-select
      v-model="category"
      :items="items"
      :error-messages="categoryErrors"
      @change="$v.category.$touch()"
      @blur="$v.category.$touch()"
      label="Category"
      required
    />

    <!-- <v-container fluid> -->
    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <img v-if="imgUrl" :src="imgUrl" height="150">
      <v-text-field
        v-model="imgName"
        :error-messages="imageErrors"
        @click="pickFile"
        @input="$v.imgName.$touch()"
        @blur="$v.imgName.$touch()"
        label="Select Image"
        prepend-icon="attach_file"
        required
      />
      <input
        ref="image"
        @change="onFilePicked"
        type="file"
        style="display: none"
        accept="image/*"
      >
    </v-flex>
    <!-- <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Hello World!
        </v-card-title>
        <v-card-text>
          Image Upload Script in VUE JS
          <hr>Yubaraj Shrestha
          <br>http://yubarajshrestha.com.np/
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click.native="dialog = false" color="green darken-1" flat="flat">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <!-- </v-container> -->

    <v-checkbox
      v-model="agreement"
      :error-messages="agreementErrors"
      @change="$v.agreement.$touch()"
      @blur="$v.agreement.$touch()"
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
import { validationMixin } from 'vuelidate'
import { required, maxLength, between } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    price: { required, between: between(1000, 123456) },
    category: { required },
    imgName: { required },
    agreement: {
      checked(val) {
        return val
      }
    }
  },

  data: () => ({
    name: '',
    price: 1000,
    category: null,
    items: [
      'top',
      'pants',
      'skirt'
    ],
    agreement: false,
    submitStatus: null,
    dialog: false,
    imgName: '',
    imgUrl: '',
    imgFile: '',
    imgType: '',
  }),

  computed: {
    agreementErrors() {
      const errors = []
      if (!this.$v.agreement.$dirty) return errors
      !this.$v.agreement.checked && errors.push('You must agree to continue!')
      return errors
    },
    categoryErrors() {
      const errors = []
      if (!this.$v.category.$dirty) return errors
      !this.$v.category.required && errors.push('Item is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    priceErrors() {
      const errors = []
      if (!this.$v.price.$dirty) return errors
      !this.$v.price.between && errors.push('Must be valid Range (1000 ~ 123456)')
      !this.$v.price.required && errors.push('Price is required')
      return errors
    },
    imageErrors() {
      const errors = []
      if (!this.$v.imgName.$dirty) return errors
      !this.$v.imgName.required && errors.push('Image is required')
      return errors
    }
  },

  methods: {
    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imgName = files[0].name
        if (this.imgName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imgUrl = fr.result
          this.imgFile = files[0] // this is an image file that can be sent to server...
          this.imgType = files[0].type
        })
      } else {
        this.imgName = ''
        this.imgFile = ''
        this.imgUrl = ''
        this.imgType = ''
      }
    },
    async submit(e) {
      e.preventDefault()
      console.log('submit!')
      // this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        const form = new FormData()
        form.append('name', this.name)
        form.append('price', this.price)
        form.append('category', this.category)
        form.append('imgFile', new Blob([this.imgFile], { type: this.imgType }), this.imgName)
        // this.$axios.setHeader('Content-Type', 'multipart/form-data', [ 'post' ])
        const ret = await this.$axios.post('/api1/clothes/registry', form) //, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(ret)
        if (ret.status === 200 && ret.data.message === 'ok') {
          this.submitStatus = 'OK'
        } else {
          this.submitStatus = 'ERROR'
        }
        // alert('Registry OK')
        // setTimeout(() => {
        //   this.submitStatus = 'OK'
        // }, 500)
      }
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.price = ''
      this.category = null
      this.agreement = false
    }
  }
}
</script>
