<script>
  import { Sveltik, Form, Field, ErrorMessage } from "sveltik";
  import { auth, db } from "../firebase/firebase";
  import Session from "../stores/Session";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let initialValues = {
    title: "",
    introduction: ""
  };

  let validate = values => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    }
    if (!values.introduction) {
      errors.introduction = "Required";
    }
    if (values.introduction && values.introduction.length < 20) {
      errors.introduction = "Introduction too shorts";
    }

    return errors;
  };

  let onSubmit = (values, { setSubmitting }) => {
    // initialValues.title = values.title;
    // initialValues.introduction = values.introduction;
    setTimeout(() => {
      if ($Session.loggedIn) {
        db.collection("galleries")
          .doc($Session.galleryId)
          .set({
            title: values.title,
            introduction: values.introduction,
            owner: $Session.userId,
            galleryPhoto: "",
            ownerApproved: 1,
            adminApproved: 0,
            created: Date.now(),
            featured: 1
          })
          .then(function() {
            dispatch("setImageUpload", true);
            window.pushToast("Gallery details saved!", true);
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
            window.pushToast("Oops!!! " + error, false);
          });

        console.log(initialValues);
      } else {
        goto("/login");
      }
      setSubmitting(false);
    }, 1000);
  };
</script>

<style>
  .componentWrapper {
    padding: 10px;
    /* min-width: 580px;
    max-width: 580px; */
    width: 100%;
    opacity: 0.95;
  }
</style>

<!-- <div class="componentWrapper"> -->

<Sveltik {initialValues} {validate} {onSubmit} let:isSubmitting>
  <Form>
    <div>
      <div>

        <label for="title">
          <b>Title</b>

        </label>
        <ErrorMessage class="errorMessage" name="title" as="label" />
      </div>
      <Field
        type="text"
        placeholder="Gallery Title"
        name="title"
        id="title"
        maxlength="30"
        style="width:100%"
        bind:value={initialValues.title} />
      <div>
        <label for="introduction">
          <b>Introduction</b>

        </label>
        <ErrorMessage class="errorMessage" name="introduction" as="label" />
      </div>
      <Field
        as="textarea"
        rows="10"
        maxlength="500"
        type="text"
        placeholder="Gallery Introduction"
        name="introduction"
        id="introduction"
        style="width:100%">
        {initialValues.introduction}
      </Field>

      <button type="submit" disabled={isSubmitting}>Create Gallery</button>
    </div>
  </Form>
</Sveltik>
<!-- </div> -->
