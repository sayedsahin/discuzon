<template>
	<main id="tt-pageContent">
		<div class="container">
			<div class="tt-wrapper-inner">
				<h1 class="tt-title-border">
					Create New Topic
				</h1>
				<form class="form-default form-create-topic">

					<!-- Title -->
					<div class="form-group">
						<label for="inputTopicTitle">Topic Title*</label>
						<div class="tt-value-wrapper">
							<div class="mb-1 px-2 d-table w3-pale-red w3-border w3-round" v-if="errors.title">{{ errors.title[0] }}</div>
							<input v-model="form.title" type="text" name="title" class="form-control" id="inputTopicTitle" placeholder="Subject of your topic" :maxlength="max.title">
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
							<select class="form-control" name="category_id" v-model="form.category_id">
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
								<a @click.prevent="createTopic()" href="" class="btn btn-secondary btn-width-lg">Create Topic</a>
							</div>
						</div>
						<div v-if="errors.message" class="w3-panel w3-pale-red w3-border w3-round">{{errors.message}}</div>
					</div>
				</form>
			</div>
			<div class="tt-topic-list tt-offset-top-30">
				<div class="tt-list-search">
					<div class="tt-title">Suggested Topics</div>
					<!-- tt-search -->
					<div class="tt-search">
						<form class="search-wrapper">
							<div class="search-form">
								<input type="text" class="tt-search__input" placeholder="Search for topics">
								<button class="tt-search__btn" type="submit">
									<svg class="tt-icon">
										<use xlink:href="#icon-search"></use>
									</svg>
								</button>
								<button class="tt-search__close">
									<svg class="tt-icon">
										<use xlink:href="#icon-cancel"></use>
									</svg>
								</button>
							</div>
						</form>
					</div>
					<!-- /tt-search -->
				</div>
				<div class="tt-list-header tt-border-bottom">
					<div class="tt-col-topic">Topic</div>
					<div class="tt-col-category">Category</div>
					<div class="tt-col-value hide-mobile">Likes</div>
					<div class="tt-col-value hide-mobile">Replies</div>
					<div class="tt-col-value hide-mobile">Views</div>
					<div class="tt-col-value">Activity</div>
				</div>
				<div class="tt-item">
					<div class="tt-col-avatar">
						<svg class="tt-icon">
							<use xlink:href="#icon-ava-n"></use>
						</svg>
					</div>
					<div class="tt-col-description">
						<h6 class="tt-title"><a href="#">
							Does Envato act against the authors of Envato markets?
						</a></h6>
						<div class="row align-items-center no-gutters hide-desktope">
							<div class="col-auto">
								<ul class="tt-list-badge">
									<li class="show-mobile"><a href="#"><span class="tt-color05 tt-badge">music</span></a></li>
								</ul>
							</div>
							<div class="col-auto ml-auto show-mobile">
								<div class="tt-value">1d</div>
							</div>
						</div>
					</div>
					<div class="tt-col-category"><span class="tt-color05 tt-badge">music</span></div>
					<div class="tt-col-value hide-mobile">358</div>
					<div class="tt-col-value tt-color-select hide-mobile">68</div>
					<div class="tt-col-value hide-mobile">8.3k</div>
					<div class="tt-col-value hide-mobile">1d</div>
				</div>
				<div class="tt-item">
					<div class="tt-col-avatar">
						<svg class="tt-icon">
							<use xlink:href="#icon-ava-h"></use>
						</svg>
					</div>
					<div class="tt-col-description">
						<h6 class="tt-title"><a href="#">
							<svg class="tt-icon">
								<use xlink:href="#icon-locked"></use>
							</svg>
							We Want to Hear From You! What Would You Like?
						</a></h6>
						<div class="row align-items-center no-gutters hide-desktope">
							<div class="col-auto">
								<ul class="tt-list-badge">
									<li class="show-mobile"><a href="#"><span class="tt-color06 tt-badge">movies</span></a></li>
								</ul>
							</div>
							<div class="col-auto ml-auto show-mobile">
								<div class="tt-value">2d</div>
							</div>
						</div>
					</div>
					<div class="tt-col-category"><span class="tt-color06 tt-badge">movies</span></div>
					<div class="tt-col-value hide-mobile">674</div>
					<div class="tt-col-value tt-color-select  hide-mobile">29</div>
					<div class="tt-col-value hide-mobile">1.3k</div>
					<div class="tt-col-value hide-mobile">2d</div>
				</div>
				<div class="tt-item">
					<div class="tt-col-avatar">
						<svg class="tt-icon">
							<use xlink:href="#icon-ava-j"></use>
						</svg>
					</div>
					<div class="tt-col-description">
						<h6 class="tt-title"><a href="#">
							Seeking partner backend developer
						</a></h6>
						<div class="row align-items-center no-gutters">
							<div class="col-auto">
								<ul class="tt-list-badge">
									<li class="show-mobile"><a href="#"><span class="tt-color03 tt-badge">exchange</span></a></li>
									<li><a href="#"><span class="tt-badge">themeforest</span></a></li>
									<li><a href="#"><span class="tt-badge">elements</span></a></li>
								</ul>
							</div>
							<div class="col-auto ml-auto show-mobile">
								<div class="tt-value">2d</div>
							</div>
						</div>
					</div>
					<div class="tt-col-category"><span class="tt-color13 tt-badge">movies</span></div>
					<div class="tt-col-value hide-mobile">278</div>
					<div class="tt-col-value tt-color-select  hide-mobile">27</div>
					<div class="tt-col-value hide-mobile">1.4k</div>
					<div class="tt-col-value hide-mobile">2d</div>
				</div>
				<div class="tt-item">
					<div class="tt-col-avatar">
						<svg class="tt-icon">
							<use xlink:href="#icon-ava-t"></use>
						</svg>
					</div>
					<div class="tt-col-description">
						<h6 class="tt-title"><a href="#">
							Cannot customize my intro
						</a></h6>
						<div class="row align-items-center no-gutters">
							<div class="col-auto">
								<ul class="tt-list-badge">
									<li class="show-mobile"><a href="#"><span class="tt-color07 tt-badge">video games</span></a></li>
									<li><a href="#"><span class="tt-badge">videohive</span></a></li>
									<li><a href="#"><span class="tt-badge">photodune</span></a></li>
								</ul>
							</div>
							<div class="col-auto ml-auto show-mobile">
								<div class="tt-value">2d</div>
							</div>
						</div>
					</div>
					<div class="tt-col-category"><span class="tt-color07 tt-badge">video games</span></div>
					<div class="tt-col-value hide-mobile">364</div>
					<div class="tt-col-value tt-color-select  hide-mobile">36</div>
					<div class="tt-col-value  hide-mobile">982</div>
					<div class="tt-col-value hide-mobile">2d</div>
				</div>
				<div class="tt-item">
					<div class="tt-col-avatar">
						<svg class="tt-icon">
							<use xlink:href="#icon-ava-k"></use>
						</svg>
					</div>
					<div class="tt-col-description">
						<h6 class="tt-title"><a href="#">
							<svg class="tt-icon">
								<use xlink:href="#icon-verified"></use>
							</svg>
							Microsoft Word and Power Point
						</a></h6>
						<div class="row align-items-center no-gutters hide-desktope">
							<div class="col-auto">
								<ul class="tt-list-badge">
									<li class="show-mobile"><a href="#"><span class="tt-color08 tt-badge">youtube</span></a></li>
								</ul>
							</div>
							<div class="col-auto ml-auto show-mobile">
								<div class="tt-value">3d</div>
							</div>
						</div>
					</div>
					<div class="tt-col-category"><span class="tt-color08 tt-badge">youtube</span></div>
					<div class="tt-col-value  hide-mobile">698</div>
					<div class="tt-col-value tt-color-select  hide-mobile">78</div>
					<div class="tt-col-value  hide-mobile">2.1k</div>
					<div class="tt-col-value hide-mobile">3d</div>
				</div>
				<div class="tt-row-btn">
					<button type="button" class="btn-icon js-topiclist-showmore">
						<svg class="tt-icon">
							<use xlink:href="#icon-load_lore_icon"></use>
						</svg>
					</button>
				</div>
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