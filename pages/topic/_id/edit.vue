<template>
	<main id="tt-pageContent">
		<div class="container">
			<div class="tt-wrapper-inner">
				<a @click.prevent="$router.back()" class="tt-badge">Back</a> 
				<h1 class="tt-title-border">Edit Topic</h1>
				<form class="form-default form-create-topic">

					<!-- Title -->
					<div class="form-group">
						<label for="inputTopicTitle">Topic Title*</label>
						<div class="tt-value-wrapper">
							<div class="mb-1 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.title">{{ errors.title[0] }}</div>
							<input v-model="topic.title" type="text" name="title" class="form-control" id="inputTopicTitle" placeholder="Subject of your topic" :maxlength="max.title">
							<span class="tt-value-input" v-text="(max.title - topic.title.length)"></span>
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
									<a @click.prevent="topic.type_id = type.id" href="" :class="`tt-button-icon${type.id == topic.type_id ? ' active' : ''}`">
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
						<div class="pt-row">
							<div class="col-left">
								<ul class="pt-edit-btn">
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-quote"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-bold"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-italic"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-share_topic"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-blockquote"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-performatted"></use>
										</svg>
									</button></li>
									<li class="hr"></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-upload_files"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-bullet_list"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-heading"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-horizontal_line"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-emoticon"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-settings"></use>
										</svg>
									</button></li>
									<li><button type="button" class="btn-icon">
										<svg class="tt-icon">
											<use xlink:href="#icon-color_picker"></use>
										</svg>
									</button></li>
								</ul>
							</div>
						</div>

						<!-- Body -->
						<div class="form-group tt-value-wrapper">
							<div class="mb-1 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.body">{{ errors.body[0] }}</div>
							<textarea v-model="topic.body" name="body" class="form-control" rows="5" placeholder="Lets get started" :maxlength="max.body"></textarea>
							<span class="tt-value-input" v-text="(max.body - topic.body.length)"></span>
						</div>

						<!-- Category -->
						<div class="form-group">
							<label for="inputTopicTitle">Category*</label>
							<div class="mb-1 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.category_id">{{ errors.category_id[0] }}</div>
							<select class="form-control" name="category_id" v-model="topic.category_id">
								<option value="">Select</option>
								<option v-for="category in formData.categories" :key="category.id" :value="category.id">{{category.name}}</option>
							</select>
						</div>

						<!-- Tags -->
						<div class="form-group capitalize tag-mr-2">
							<label class="pb-2">Tags</label><br>
							<div v-for="tag in formData.tags" :key="tag.id" class="d-contents">
	              <input type="checkbox" :value="tag.id" :id="`tag-${tag.id}`" v-model="topic.tags">
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
								<a @click.prevent="updateTopic()" href="" class="btn btn-secondary btn-width-lg">Edit Topic</a>
							</div>
						</div>
						<div v-if="success" class="fixed-bottom w3-panel w3-green p-2 w3-round" style="">{{success}}</div>
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
    	tag: '',
    	max: {
    		title: 200,
    		body: 2000
    	},
    	success: false
    }
  },
  async asyncData ({$axios, params}) {
  	let {data} = await $axios.$get(`/topic/${params.id}/edit`);
  	let formData = await $axios.$get(`/topic/create`);
    return {
    	topic: data,
    	formData: formData
    };
  },

  methods: {
    async updateTopic () {
    	try{ 
	      let data = await this.$axios.$patch(`/topic/${this.$route.params.id}`, this.topic)
	      if (data === 1) {
	      	this.success = 'Updated Successful'
	      	setTimeout(() => this.success = false, 5000)
	      }
	      return
    	}catch(e){
    	  return
    	}
    },

    async createTag () {
    	try{ 
	      let data = await this.$axios.$post('/tag', { name: this.tag })
	      this.formData.tags = [...this.formData.tags, data]
	      this.tag = ''
    	}catch(e){
    	  return
    	}
    }
  }
}
</script>

<style lang="css">
</style>