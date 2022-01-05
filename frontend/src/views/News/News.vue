<template>
  <div class="anonymousNewsBox">
    <div class="topBox mb-10" v-if="user">
      <div class="inputFilter">
        <v-text-field
          v-model="search"
          label="Filter"
          outlined
          append-icon="mdi-filter"
          @keyup.enter="addFilter"
        ></v-text-field>
      </div>
      <div class="filters">
        <span
          v-for="(filter, index) in filters"
          :key="index"
          class="filterItem"
          @click="removeFilter(filter)"
        >
          {{ filter }}
        </span>
      </div>
    </div>
    <v-layout class="layout" row justify-space-around v-if="articles">
      <div
        class="article"
        @click="openArticle(article)"
        v-for="article in isInFilters"
        :key="article.id"
      >
        <v-img
          class="articleImage"
          contain
          :lazy-src="article.enclosure.url"
          :src="article.enclosure.url"
        ></v-img>
        <h3 class="articleTitle">
          {{ article.title }}
        </h3>
        <div class="articleWritter">
          <span>{{ article.creator }}</span>
        </div>
      </div>
    </v-layout>
    <!-- <div class="Pagination text-center">
      <v-pagination
        v-model="page"
        :length="6"
        circle
        color="#72C4FF"
      ></v-pagination>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "AnonymousNews",
  data() {
    return {
      page: 1,
      search: null,
      articles: null,
      filters: [],
      profile: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    isInFilters() {
      if (this.filters.length > 0) {
        return this.articles.filter((article) => {
          let isIn = false;
          article.categories.forEach((category) => {
            if (this.filters.includes(category.toLowerCase())) {
              isIn = true;
            }
          });
          return isIn;
        });
      } else {
        return this.articles;
      }
    },
  },
  mounted() {
    axios({
      method: "GET",
      url: process.env.VUE_APP_API_URL + "/api/rss",
    })
      .then((response) => {
        this.articles = response.data.data;
      })
      .catch((err) => {
        throw err;
      });
    if (this.user) {
      axios({
        method: "GET",
        url: process.env.VUE_APP_API_URL + "/api/user/profile",
        headers: {
          jwt: this.user.token,
        },
      })
        .then((response) => {
          this.profile = response.data.data[0];
          this.filters = response.data.data[0].keywords;
        })
        .catch((err) => {
          throw err;
        });
    }
  },
  methods: {
    openArticle(article) {
      this.$router.push("/news/" + article.id);
    },
    addFilter() {
      this.filters.push(this.search.toLowerCase());
      axios({
        method: "PUT",
        url: process.env.VUE_APP_API_URL + "/api/user/profile",
        headers: {
          jwt: this.user.token,
        },
        data: {
          password: this.profile.password,
          keywords: this.filters,
        },
      })
        .then(() => {
          this.search = null;
        })
        .catch((err) => {
          this.search = null;
          throw err;
        });
    },
    removeFilter(filter) {
      this.filters.splice(this.filters.indexOf(filter), 1);
      axios({
        method: "PUT",
        url: process.env.VUE_APP_API_URL + "/api/user/profile",
        headers: {
          jwt: this.user.token,
        },
        data: {
          password: this.profile.password,
          keywords: this.filters,
        },
      })
        .then(() => {
          this.filters.push(this.search.toLowerCase());
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.anonymousNewsBox {
  width: 100%;
  .topBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .inputFilter {
      width: 25rem;
    }
    .filters {
      display: flex;
      .filterItem {
        cursor: pointer;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        background-color: rgb(133, 124, 124);
        color: white;
      }
    }
  }

  .layout {
    .article {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-width: 210px;
      width: calc(90% / 4);
      height: calc(80% / 2);
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      margin-bottom: 2rem;
      .articleTitle {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        font-size: 1rem;
      }
      .articleWritter {
        display: flex;
        width: 100%;
        align-items: center;
        span {
          margin-left: 0.5rem;
          font-size: 0.8rem;
          color: #72c4ff;
        }
      }
    }
  }

  .Pagination {
    width: fit-content;
    margin: auto;
    margin-top: 2.5rem;
    background: #ededed;
    border-radius: 50px;
    padding: 0.45rem;
  }

  @media only screen and (max-width: 600px) {
    .layout {
      .article {
        min-width: 210px;
        width: 90%;
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 2rem;
      }
    }

    .Pagination {
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding: 0;
    }
  }
}
</style>
