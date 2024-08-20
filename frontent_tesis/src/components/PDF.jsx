import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { pilares } from '../data/data';

// Create styles
const styles = StyleSheet.create({

    alumno:{
        width:'50%',
        marginTop:'20px',
        marginLeft:'auto',
        marginRight:'auto',
        fontSize:'10px',
        border:'1px solic #000000',     
    },
    alumnodata:{
        fontSize:'13px',
        padding:'5px',
        borderBottom:'1px solic #000000',
    },
    page:{
        padding:'20px',
        flexDirection: 'column',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        textAlign:'center',
        textTransform:'uppercase',
        flexDirection:'column',
        display:'flex',
        alignItems:'center',
        padding:'16px'
    },
    section:{
        width:'100%',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column'
    },
    text:{
        fontSize:'13px',
        padding:'5px',
        display:'flex',
    },
    table:{
        width:'80%',
        marginTop:'20px',
        marginLeft:'auto',
        marginRight:'auto',
        padding: '5px',
        fontSize:'10px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column'
    },
    row:{
        flexDirection:'row',
        border:'1px solic #000000',
    },
    header:{
        width:'15px',
        textAlign:'center',
        fontWeight:'800',
        textTransform:'uppercase',
        border:'1px solic #000000'
    },
    header0:{
        width:'24px',
        textAlign:'center',
        fontWeight:'800',
        textTransform:'uppercase',
        border:'1px solic #000000'
    },
    cell:{
        width:'15px',
        textAlign:'center',
        color:'#000000',
        border:'1px solic #000000',
    },
    cell0:{
        width:'24px',
        textAlign:'center',
        color:' #000000',
        border:'1px solic #000000',
    },
    containerText:{
        width:'500px',
        marginLeft:'auto',
        marginRight:'auto',
    }

})

// Create Document Component
const Pdf = () => {
    const [data, setData] = useState([]);
    const getData =()=>{
        setData(pilares);
    }

    useEffect(()=>{
        getData()
    },[]);

    return(
            <Document>
            <Page size={"A4"} style={styles.Page}>
                <View style={styles.alumno}>
                <View style={styles.alumnodata}>
                        <Text>Date:XX-XX-XXXX</Text>
                    </View>
                    <View style={styles.alumnodata}>
                        <Text>Name:XXXXXXX</Text>
                    </View>
                    <View style={styles.alumnodata}>
                        <Text>Last Name:XXXXXXX</Text>
                    </View>
                    <View style={styles.alumnodata}>
                        <Text>CI:XXXXXXX</Text>
                    </View>
                    <View style={styles.alumnodata}>
                        <Text>Año:XXX   Seccion:XXX</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}> registro de asistencia</Text>
                </View>
                    <View style={styles.containerText}>
                        <Text style={styles.text}> a la fecha en que es emitido este documento el alumno 
                         XXXXXX XXXXXXX es poseedor de una asitencia del X%
                        </Text>
                    </View>
                <View style={styles.section}>
                    <Text style={styles.title}> tabla de asistena</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <View style={styles.header0}>
                            <Text>MO</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>1</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>2</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>3</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>4</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>5</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>6</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>7</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>8</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>9</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>10</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>11</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>12</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>13</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>14</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>15</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>16</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>17</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>18</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>19</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>20</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>21</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>22</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>23</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>24</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>25</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>26</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>27</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>28</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>29</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>30</Text>
                        </View>
                        <View style={styles.header}>
                            <Text>31</Text>
                        </View>
                    </View>
                    {data.map((el, index)=> <View key={index} style={styles.row}>
                        <View style={styles.cell0}>
                            <Text>{el.id}</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                        <View style={styles.cell}>
                            <Text></Text>
                        </View>
                    </View>)}
                </View>
            </Page>
        </Document>
    );
    
};

export default Pdf;