<template>
	<main id="tt-pageContent">
		<div class="container">
			<div class="tt-wrapper-inner">
				<h1 class="tt-title-border">
					Create New Topic
				</h1>
				<form @submit.prevent="createTopic()" class="form-default form-create-topic">

					<!-- Title -->
					<div class="form-group">
						<label for="inputTopicTitle">Topic Title*</label>
						<div class="tt-value-wrapper">
							<div class="mb-1 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.title">{{ errors.title[0] }}</div>
							<input v-model="form.title" type="text" name="title" class="form-control" id="inputTopicTitle" placeholder="Subject of your topic" :maxlength="max.title" required>
							<span class="tt-value-input" v-text="(max.title - form.title.length)"></span>
						</div>
						<div class="tt-note">Describe your topic well, while keeping the subject as short as possible.</div>
					</div>

					<!-- Type -->
					<div class="form-group">
						<label>Topic Type*</label>
						<div class="mb-1 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.type_id">{{ errors.type_id[0] }}</div>
						<div class="tt-js-active-btn tt-wrapper-btnicon">
							<div class="row tt-w410-col-02">
								<div v-for="type in formData.types" :key="type.id" class="col-4 col-lg-3 col-xl-2">
									<!-- tt-button-icon -->
									<a @click.prevent="form.type_id = type.id" href="" :class="`tt-button-icon${type.id == form.type_id ? ' active' : ''}`">
										<span class="tt-icon" v-html="type.icon">
										</span>
										<span class="tt-text">{{ type.name }}</span>
									</a>
								</div>
							</div>
						</div>
					</div>

					<div class="pt-editor">
						<h6 class="pt-title">Topic Body*</h6>

						<!-- Body -->
						<div class="form-group tt-value-wrapper">
							<client-only>
				        <Editor v-model="form.body" :limit="2000"/>
				      </client-only>
							<div class="mt-1 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.body">{{ errors.body[0] }}</div>
						</div>

						<!-- Category -->
						<div class="form-group">
							<label for="inputTopicTitle">Category*</label>
							<div class="mb-1 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.category_id">{{ errors.category_id[0] }}</div>
							<select class="form-control" name="category_id" v-model="form.category_id" required>
								<option value="">Select</option>
								<option v-for="category in formData.categories" :key="category.id" :value="category.id">{{category.name}}</option>
							</select>
						</div>

						<!-- Tags -->
						<div class="form-group capitalize tag-mr-2">
							<label class="pb-2">Tags</label><br>
							<div v-for="tag in formData.tags" :key="tag.id" class="d-contents">
	              <input type="checkbox" :value="tag.id" :id="`tag-${tag.id}`" v-model="form.tags">
								<label :for="`tag-${tag.id}`">{{tag.name}}</label>
	            </div>
          	</div>

          	<!-- Add New Tag -->
          	<div class="row">
							<div class="col-md-6 col-lg-4">
		          	<div class="form-group">
									<label for="create-tag" class="pb-1">Add A New Tag</label>
									<div class="mb-1 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.name">{{ errors.name[0] }}</div>
									<div class="d-flex">
										<input v-model="tag" type="text" name="tag" class="form-control mr-2" id="create-tag" placeholder="Add a new tag">
										<button @click.prevent="createTag()" type="submit" class="btn btn-primary mt-0">Add</button>
									</div>
								</div>
							</div>
						</div>

						<!-- Submit -->
						<div class="row">
							<div class="col-auto ml-md-auto">
								<button type="submit" class="btn btn-secondary btn-width-lg">Create Topic</button>
							</div>
						</div>
						<div v-if="errors.message" class="w3-panel w3-pale-red w3-border w3-round">{{errors.message}}</div>
					</div>
				</form>
			</div>
		</div>
	</main>
</template>

<script>
export default {
	middleware: ['auth'],
  data () {
    return {
    	form: {
    		type_id: 1,
    		category_id: '',
    		body: '',
    		title: '',
    		tags: []
    	},
    	max: {
    		title: 200,
    		body: 2000
    	},
    	formData: {},
    	tag: '',
    }
  },
  computed: {
    async getFormData () {
      let data = await this.$axios.$get(`/topic/create`);
      this.formData = data;

    }
  },
  methods: {
    async createTopic () {
    	try{ 
	      let id = await this.$axios.$post('/topic', this.form)
	      this.$router.push(`/topic/${id}`)
    	}catch(e){
    	  return
    	}
    },

    async createTag () {
    	try{ 
	      let data = await this.$axios.$post('/tags', { name: this.tag })
	      this.formData.tags = [...this.formData.tags, data]
	      this.tag = ''
    	}catch(e){
    	  return
    	}
    }
  },
  mounted(){
  	this.getFormData
  }
}
</script>

<style lang="css">
	.capitalize label {text-transform: capitalize;}
	.d-contents {display: contents;}
	.tag-mr-2 label{margin-right: 0.5rem}
</style>