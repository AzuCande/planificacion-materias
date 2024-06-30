import pandas as pd
import streamlit as st

# ------ State Configuration -------
if 'mail' not in st.session_state:
    st.session_state.mail = ''

# ----------------------------------

# ------ Page Configuration -------
st.set_page_config(page_title='Excepciones ITBA', page_icon='🏫', layout='wide')
st.title('🔑 Dashboard')
st.divider()
st.sidebar.write(f'Copyright © 2024 ITBA')
st.sidebar.write('Azul Kim, Camila Sierra Perez, Malena Vasquez Currie')
# ----------------------------------

if st.session_state.mail:
    requests_by_dep = pd.read_excel('data/mock_exceptions_copy.xlsx')
    widget_id = (id for id in range(1, 100_00))

    if st.session_state.mail == 'vidauniversitaria@itba.edu.ar':
        st.dataframe(requests_by_dep)
        st.button('📧 Enviar Correos')
    else:
        tab1, tab2 = st.tabs(['Pendientes', 'Completadas'])
        with tab1:
            df_user = requests_by_dep[(requests_by_dep['Mail'] == st.session_state.mail) & (requests_by_dep['Estado'] == 'Pendiente')]
            if df_user.empty:
                st.warning('No hay excepciones para aprobar.')
            else:
                st.info('Para modificar un valor solo seleccione la celda.')
                edited_df = st.data_editor(df_user, use_container_width=True, key='pending_edited', disabled=('Apellido/s',	'Nombre/s', 'Legajo', 'Carrera', 'Tipo de Excepcion', 'Codigo de Materia', 'Nombre de Materia', 'Comision', 'Comentarios Adicionales', 'Codigo de Materia (que se superpone)',	'Nombre de Materia (que se superpone)', 'Comision (que se superpone)', 'Dia/s y tramo/s horarios (que se superpone)', 'Codigo de Correlativa (que falta)', 'Nombre de Correlativa (que falta)',	'Comision de Correlativa (que falta)', 'Departamento', 'Responsable', 'Mail'))
                save_pending = st.button('💾 Guardar Cambios', key=next(widget_id))
                if save_pending:
                    df = edited_df
                    for i in range(0, len(df.index)):
                        if i in st.session_state['pending_edited']['edited_rows']:
                            index = int(df_user.iloc[[i]].index[0])
                            if 'Estado' in st.session_state['pending_edited']['edited_rows'][i]:
                                requests_by_dep.loc[index, 'Estado'] = st.session_state['pending_edited']['edited_rows'][i]['Estado']
                    requests_by_dep.to_excel('data/mock_exceptions_copy.xlsx', index=False)
                    st.success('Cambios guardados!')
        with tab2:
            df_user = requests_by_dep[(requests_by_dep['Mail'] == st.session_state.mail) & (requests_by_dep['Estado'] != 'Pendiente')]
            if df_user.empty:
                st.warning('No hay excepciones para aprobar.')
            else:
                st.info('Para modificar un valor solo seleccione la celda.')
                edited_df = st.data_editor(df_user, use_container_width=True, key='completed_edited', disabled=('Apellido/s',	'Nombre/s', 'Legajo', 'Carrera', 'Tipo de Excepcion', 'Codigo de Materia', 'Nombre de Materia', 'Comision', 'Comentarios Adicionales', 'Codigo de Materia (que se superpone)',	'Nombre de Materia (que se superpone)', 'Comision (que se superpone)', 'Dia/s y tramo/s horarios (que se superpone)', 'Codigo de Correlativa (que falta)', 'Nombre de Correlativa (que falta)',	'Comision de Correlativa (que falta)', 'Departamento', 'Responsable', 'Mail'))
                save_completed = st.button('💾 Guardar Cambios', key=next(widget_id))
                if save_completed:
                    df = edited_df
                    for i in range(0, len(df.index)):
                        if i in st.session_state['completed_edited']['edited_rows']:
                            index = int(df_user.iloc[[i]].index[0])
                            if 'Estado' in st.session_state['completed_edited']['edited_rows'][i]:
                                requests_by_dep.loc[index, 'Estado'] = st.session_state['completed_edited']['edited_rows'][i]['Estado']
                    requests_by_dep.to_excel('data/mock_exceptions_copy.xlsx', index=False)
                    st.success('Cambios guardados!')

else:
    st.warning('Debe iniciar sesión primero')