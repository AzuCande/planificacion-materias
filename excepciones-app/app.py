import pandas as pd
import streamlit as st

# ------ State Configuration -------
if 'mail' not in st.session_state:
    st.session_state.mail = ''
# ----------------------------------

# ------ Page Configuration -------
st.set_page_config(page_title='Excepciones ITBA', page_icon='🏫', layout='wide')
st.title('🏫 Excepciones ITBA')
st.divider()
st.sidebar.write(f'Copyright © 2024 ITBA')
st.sidebar.write('Azul Kim, Camila Sierra Perez, Malena Vasquez Currie')
# ----------------------------------

widget_id = (id for id in range(1, 100_000))
member_id = (id for id in range(1, 100_000))
# ----------------------------------

df = pd.read_excel('data/mapping.xlsx')

mails = df['Mail'].unique()

st.subheader('Login')
st.info('Ingrese con su email de ITBA', icon="ℹ️")
with st.form('login', clear_on_submit=True):
    mail = st.text_input('Email:', key='user_mail')
    submit = st.form_submit_button('➡️ Ingresar')

if submit:
    if mail in mails:
        st.session_state.mail = mail
        name = df[df['Mail'] == mail]['Responsable'].values[0]
        st.success('Bienvenido ' + name + '!')
    elif mail == 'vidauniversitaria@itba.edu.ar':
        st.session_state.mail = mail
        st.success('Bienvenido Vida Universitaria!')
    else:
        st.error('Email incorrecto')


