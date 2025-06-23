import streamlit as st
import requests

st.title("Podcast Generator 🎙️")

topic = st.text_input("Enter podcast topic:")

if st.button("Generate Podcast") and topic:
    with st.spinner("Generating..."):
        try:
            response = requests.post(
                "http://localhost:5000/generate",
                json={"topic": topic},
                timeout=300
            )
            if response.status_code == 200:
                data = response.json()
                st.subheader("Podcast Script")
                st.text_area("Script", data["script"], height=300)
                st.subheader("Podcast Audio")
                st.audio(data["audioUrl"])
                st.download_button("Download Audio", requests.get(data["audioUrl"]).content, "podcast.mp3")
            else:
                st.error(f"Error: {response.json().get('error', 'Unknown error')}")
        except Exception as e:
            st.error(f"Request failed: {e}")