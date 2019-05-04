<template>
  <v-list>
    <template v-for="(item, idx0) in items">
      <v-list-group
        v-if="item.subitems"
        :key="idx0"
        :prepend-icon="item.icon"
        value="true"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile>
        </template>
        <v-list-tile
          v-for="(si, idx1) in item.subitems"
          :key="idx1"
          :to="si.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-text="si.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="si.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>

      <v-list-tile
        v-else
        :key="idx0"
        :to="item.to"
        router
        exact
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title" />
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
/* eslint-disable object-property-newline */

export default {
  name: 'Lmb',
  data: () => ({
    items: [
      { title: 'Welcome', to: '/', icon: 'apps' },
      { title: 'Inspire', to: '/inspire', icon: 'bubble_chart' },
      { title: 'Admin', to: '/admin', icon: 'settings', subitems: [
        { title: 'Add Users', to: '/admin/add_users', icon: 'person_add' },
        { title: 'Add Clothes', to: '/admin/add_clothes', icon: 'library_add' }
      ] }
    ]
  })
}
</script>

<style lang="stylus">
aside:not(v-navigation-drawer--mini-variant) > div.v-list > div.v-list__group > div.v-list__group__items
  padding-left 56px
aside.v-navigation-drawer--mini-variant > div.v-list > div.v-list__group > div.v-list__group__items
  padding-left 0px
</style>
