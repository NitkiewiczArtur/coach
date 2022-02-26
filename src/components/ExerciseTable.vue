<template>
  <div class="container">
    <table class="font-color" style="width: 100vw">
      <thead class="table-header-row">
        <tr>
          <th class="first-empty-header"></th>
          <th>Photo</th>
          <th>Exercise ID</th>
          <th>Name</th>
          <th>Target</th>
          <th>Body part</th>
          <th>Equipment</th>
          <th>Add To Favourite</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exercise in exercisesToDisplay" :key="exercise.id">
          <td></td>
          <td>
            <img
              style="height: 68px"
              :src="exercise.gifUrl"
              alt="exercise gif"
            />
          </td>
          <td>{{ exercise.id }}</td>
          <td>
            {{ exercise.name }}
          </td>
          <td>
            {{ exercise.target }}
          </td>
          <td>
            {{ exercise.target }}
          </td>
          <td>
            {{ exercise.bodyPart }}
          </td>
          <td />
          <td>
            {{ exercise.equipment }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showLoadingImage">
      <img
        class="loading-image"
        src=""
        alt="Image of exhausted Morty"
      />
    </div>
    <div class="error-wrapper" v-else-if="error">
      <div v-text="error"></div>
      <img
        class="error-image"
        src=""
        alt="Image of confused Morty"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ExerciseTable",
  props: {
    exercisesToDisplay: {
      type: Array,
      required: true,
    },
    showLoadingImage: {
      type: Boolean,
    },
    error: {
      type: Error,
    },
  },
});
</script>

<style lang="scss" scoped>
.loading-image {
  width: 60vw;
  margin-left: 20vw;
}

.error-image {
  width: 20vw;
}

.error-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0;
  height: 100%;
  width: 100%;
  padding: 0;

  thead tr {
    height: 3.5rem;
    background-color: rgb(229, 234, 244, 0.25);
    border-bottom: none;
  }

  th {
    width: 10vw;
  }

  tr {
    height: 5.5rem;
    border-bottom: #a9b1bd solid 0.1px;
  }
}

.favourite-btn {
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  color: #11b0c8;
  border: #11b0c8 solid 3px;
  border-radius: 5px;
  padding-top: 7px;

  &--isFavourite {
    background-color: #11b0c8;
    border: #11b0c8 solid 3px;
    color: white;
  }
}

.border-bottom {
  border-bottom: #a9b1bd solid 0.25px;
}

.first-empty-header {
  width: 9rem;
}

@media screen and (max-width: 590px) {
  thead {
    display: none;
  }
  .container {
    tr {
      display: flex;
      flex-direction: column;
      height: 18rem;
      justify-content: space-between;
      align-items: center;
    }
  }
  .first-empty-header {
    display: none;
  }
}
</style>
