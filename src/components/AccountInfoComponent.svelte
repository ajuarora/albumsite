<script>
  import { fade, fly } from "svelte/transition";
  import { auth, db } from "../firebase/firebase";
  import { Modal } from "svelte-chota";
  // import Tos from "./Tos.svelte";
  let open = false;

  import { Sveltik, Form, Field, ErrorMessage } from "sveltik";
  let errorMessage = "";
  let initialValues = {
    email: "",
    password: ""
  };

  let validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  let onSubmit = (values, { setSubmitting }) => {
    errorMessage = "";
    setTimeout(() => {
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then(response => {
          window.pushToast("Login successful", true);
        })
        .catch(error => {
          errorMessage = error;
          window.pushToast(error, false);
        });
      setSubmitting(false);
    }, 1000);
  };
</script>

<div class="componentWrapper" in:fly={{ y: -200, duration: 500 }}>

  <Sveltik {initialValues} {validate} {onSubmit} let:isSubmitting>
    <Form>
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

      <button type="submit" disabled={isSubmitting}>Login</button>
    </Form>
  </Sveltik>

</div>
