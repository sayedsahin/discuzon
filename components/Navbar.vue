<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand to="/">Home</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<template v-if="!authenticated">
						<b-nav-item to="/login">Login</b-nav-item>
						<b-nav-item to="/register">Register</b-nav-item>
					</template>
					<template v-if="authenticated">
						<b-nav-item to="/profile">Profile</b-nav-item>
						<b-nav-item to="/topics">Topic</b-nav-item>
						<b-nav-item to="/dashboard">Dashboard</b-nav-item>
					</template>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-form>
						<b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
						<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
					</b-nav-form>

					<b-nav-item-dropdown right>
						<!-- Using 'button-content' slot -->
						<template #button-content>
							<em v-if="!authenticated"></em>
							<em v-if="authenticated">{{ user.name }}</em>
						</template>
						<template v-if="!authenticated">
							<b-dropdown-item to="/login">Login</b-dropdown-item>
							<b-dropdown-item to="/register">Register</b-dropdown-item>
						</template>
						<template v-if="authenticated">
							<b-dropdown-item to="/profile">Profile</b-dropdown-item>
							<b-dropdown-item @click.prevent="logout">Sign Out</b-dropdown-item>
						</template>

						
						
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
export default {

  name: 'Navbar',

  data () {
		return {

		}
  },
  methods: {
  	logout(){
  		this.$auth.logout()
  	}
  }
}
</script>