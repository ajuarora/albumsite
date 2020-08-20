<script>
  import { fade, fly } from "svelte/transition";
  import { auth, db } from "../firebase/firebase";
  import { Modal } from "svelte-chota";
  //   import Tos from "./Tos.svelte";
  let open = false;

  import { Sveltik, Form, Field, ErrorMessage } from "sveltik";
  let errorMessage = "";
  let initialValues = {
    email: "",
    password: "",
    repeatPassword: ""
  };

  let validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password || values.password.length < 8) {
      errors.password = "Password of at least 8 characters required";
    }
    if (!values.repeatPassword || values.repeatPassword.length < 8) {
      errors.repeatPassword = "Password of at least 8 characters required";
    } else {
      if (values.repeatPassword != values.password) {
        errors.repeatPassword = "Password don't match";
      }
    }
    return errors;
  };

  let onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(response => {
          console.log(response);
          db.collection("profile")
            .doc(response.user.uid)
            .set({
              screenName: values.email.replace(/@/gi, "-").replace(/\./gi, "-"),
              aboutMe: "",
              country: "",
              profilePic: "/images/profile/girldefault.jpg",
              defaultProfilePic: true,
              gender: "F",
              uid: response.user.uid
            })
            .then(function() {})
            .catch(function(error) {
              console.error("Error writing document: ", error);
              window.pushToast("Oops!!! " + error, false);
            });
        })
        .catch(error => {
          errorMessage = error;
        });
      setSubmitting(false);
    }, 1000);
  };
</script>

<style>
  .componentWrapper {
    margin: 10px;
    min-width: 500px;
    max-width: 500px;
    opacity: 0.95;
    background-color: rgb(65, 65, 65);
  }

  /* Set a style for the submit/register button */
</style>

<div class="componentWrapper" in:fly={{ y: -200, duration: 500 }}>
  <label id="errorMessage">{errorMessage}</label>
  <Sveltik {initialValues} {validate} {onSubmit} let:isSubmitting>
    <Form>
      <div>
        <div>

          <label for="email">
            <b>Email</b>

          </label>
          <ErrorMessage class="errorMessage" name="email" as="label" />
        </div>
        <Field
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          style="width:100%"
          bind:value={initialValues.email} />
        <div class="block">
          <label for="password">
            <b>Password</b>

          </label>
          <ErrorMessage class="errorMessage" name="password" as="label" />
        </div>
        <Field
          type="password"
          placeholder="Enter Password"
          name="password"
          id="password"
          style="width:100%"
          bind:value={initialValues.password} />
        <div class="block">

          <label for="repeatPassword">
            <b>Repeat Password</b>
          </label>
        </div>
        <ErrorMessage class="errorMessage" name="repeatPassword" as="label" />

        <Field
          type="password"
          placeholder="Repeat Password"
          style="width:100%"
          name="repeatPassword"
          id="repeatPassword"
          bind:value={initialValues.repeatPassword} />

        <label>
          By creating an account you agree to our
          <a href="#" on:click={e => (open = true)}>Terms & Privacy</a>
          .
        </label>
        <button disabled={isSubmitting} type="submit">Register</button>
      </div>

      <div class=" signin">
        <p>
          Already have an account?
          <a href="/login">Sign in</a>
          .
        </p>
      </div>
    </Form>
  </Sveltik>
  <Modal bind:open>
    <!-- <Tos /> -->
  </Modal>
</div>
