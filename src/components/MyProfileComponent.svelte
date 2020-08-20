<script>
  import { fade, fly } from "svelte/transition";
  import { auth, db, storage } from "../firebase/firebase";
  import FileUpload from "sveltefileuploadcomponent";
  import FileUploadThumbnail from "file-upload-thumbnail";
  import UploadProfilePic from "./UploadProfilePic.svelte";
  import Session from "../stores/Session";
  import { onMount, afterUpdate, beforeUpdate } from "svelte";
  import countryList from "./countryList";
  import { Sveltik, Form, Field, ErrorMessage } from "sveltik";
  let errorMessage = "";
  var initialValues;
  var img;
  let questions = [{ id: "M", text: `Male` }, { id: "F", text: `Female` }];
  let triggerSaveImage = false;

  onMount(async () => {
    db.collection("profile")
      .doc($Session.userId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          initialValues = doc.data();
          if (initialValues.defaultProfilePic) {
            image = initialValues.profilePic;
          } else {
            storage
              .ref(`profilePics/${$Session.userId}/`)
              .child("profile.jpg")
              .getDownloadURL()
              .then(function(url) {
                image = url;
              });
          }
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  });

  let image;

  let validate = values => {
    const errors = {};
    if (!values.screenName) {
      errors.screenName = "Required";
    } else {
    }
    console.log(values.aboutMe);
    if (!values.aboutMe) {
      errors.aboutMe = "Required";
    } else {
    }
    return errors;
  };

  let onSubmit = (values, { setSubmitting }) => {
    errorMessage = "";
    var exists = false;
    setTimeout(async () => {
      if ($Session.loggedIn) {
        await db
          .collection("profile")
          .where("screenName", "==", values.screenName)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              if (doc.id != $Session.userId) exists = true;
            });
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
        if (!exists) {
          db.collection("profile")
            .doc($Session.userId)
            .update({
              aboutMe: values.aboutMe,
              country: values.country,
              gender: values.gender,
              screenName: values.screenName
            })
            .then(function() {
              triggerSaveImage = true;
              window.pushToast("Gallery details saved!", true);
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
              window.pushToast("Oops!!! " + error, false);
            });
        } else {
          errorMessage = "Please use different screen name";
          window.pushToast(
            "Screen name already in use. \r\n Please use different screen name.",
            false
          );
        }
        console.log(initialValues);
      } else {
        goto("/login");
      }
      setSubmitting(false);
    }, 1000);
  };
  const changeGender = event => {
    if (event.target.value == "F" && initialValues.defaultProfilePic) {
      image = "/images/profile/girldefault.jpg";
    } else if (event.target.value == "M" && initialValues.defaultProfilePic) {
      image = "/images/profile/boydefault.jpg";
    }
  };

  const handleUploads = async uploadedFiles => {
    image = URL.createObjectURL(uploadedFiles.detail.files);
  };
</script>

<style>
  .cropper {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    /* left: 0px; */
    top: 0px;
    max-width: 180px;
    height: 180px;

    border: 1px none;
  }
</style>

{#if initialValues}
  <div class="container">
    <Sveltik {initialValues} {validate} {onSubmit} let:isSubmitting>

      <Form>

        <div class="row">
          <div class="col-sm-6 col-md-4" style="text-align: center;">
            <div class="cropper">
              <UploadProfilePic {image} {triggerSaveImage} />
              <FileUpload on:input={handleUploads} multiple={false}>
                Choose new picture...
              </FileUpload>
              <div>
                <div>
                  <label for="gender">
                    <b>Gender</b>
                  </label>
                </div>
                <select
                  name="gender"
                  id="gender"
                  on:change={changeGender}
                  bind:value={initialValues.gender}>
                  {#each questions as question}
                    <option value={question.id}>{question.text}</option>
                  {/each}
                </select>

                <div>
                  <div>
                    <label for="gender">
                      <b>Country</b>
                    </label>
                  </div>
                  <select
                    name="country"
                    id="country"
                    bind:value={initialValues.country}>
                    {#each countryList as country}
                      <option value={country.code}>{country.name}</option>
                    {/each}
                  </select>
                </div>

              </div>
            </div>
          </div>

          <div class="col-sm-6 col-md-8">
            <div>
              <div>
                <label for="screenName">
                  <b>Screen Name</b>
                </label>

                <ErrorMessage
                  class="errorMessage"
                  name="screenName"
                  as="label" />
              </div>
              <Field
                type="input"
                placeholder="Screen Name"
                name="screenName"
                id="screenName"
                bind:value={initialValues.screenName}
                style="width:100%" />

            </div>
            <div>
              <div>
                <label for="aboutMe">
                  <b>About me</b>
                </label>
                <ErrorMessage class="errorMessage" name="aboutMe" as="label" />
              </div>
              <Field
                as="textarea"
                rows="14"
                maxlength="500"
                type="text"
                placeholder="About me"
                name="aboutMe"
                id="aboutMe"
                style="width:100%">
                {initialValues.aboutMe}
              </Field>
            </div>
            <div style="text-align: end;">
              <button type="submit" disabled={isSubmitting}>
                Save Profile
              </button>
            </div>

          </div>
        </div>
        <div class="row">
          <div />
        </div>

      </Form>
    </Sveltik>
  </div>
{/if}
