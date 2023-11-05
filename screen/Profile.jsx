import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native";
import CursusPicker from "../components/CursusPicker";
import PercentageBar from "../components/PercentageBar";
import Project from "../components/Project";
import Skill from "../components/Skill";

export const Profile = ({ route }) => {
  const [selectedCursus, setSelectedCursus] = useState(21);
  const [level, setLevel] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [cursusList, setCursusList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [userData, setUserData] = useState(route.params.userData);

  useEffect(() => {
    setSelectedCursus(
      userData.cursus_users[userData.cursus_users.length - 1].cursus_id
    );
    if (level?.toString().split(".")[1])
      setPercentage(level?.toString().split(".")[1]);
  }, []);

  useEffect(() => {
    setLevel(
      userData.cursus_users.find(
        (cursus) => cursus.cursus_id === selectedCursus
      )?.level
    );
    setSkills(
      userData.cursus_users.find(
        (cursus) => cursus.cursus_id === selectedCursus
      )?.skills
    );
    setProjects(
      userData.projects_users.filter(
        (project) =>
          project.cursus_ids.includes(selectedCursus) &&
          project.status === "finished" &&
          !project.project.parent_id
      )
    );
  }, [selectedCursus]);

  useEffect(() => {
    if (level?.toString().split(".")[1])
      setPercentage(level?.toString().split(".")[1]);
  }, [level]);

  useEffect(() => {
    let list = [];
    for (let i = 0; i < userData.cursus_users.length; i++) {
      list = [
        ...list,
        {
          key: userData.cursus_users[i].cursus_id,
          label: userData.cursus_users[i].cursus.name,
        },
      ];
    }
    setCursusList(list);
  }, []);

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.avatar} source={{ uri: userData.image.link }} />
          <Text style={styles.name}>{userData.usual_full_name}</Text>
          <Text style={styles.login}>{userData.login}</Text>
        </View>
      </View>

      <View style={styles.profileDetailCursus}>
        <View style={styles.cursusTitleContainer}>
          <Text style={styles.title}>Cursus:</Text>
        </View>
        <View style={styles.cursusPickerContainer}>
          <CursusPicker
            cursusList={cursusList}
            setSelectedCursus={setSelectedCursus}
          />
        </View>
      </View>

      <View style={styles.profileDetailSection}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Email:</Text>
          <Text style={styles.count}>{userData.email}</Text>
        </View>
      </View>

      <View style={styles.profileDetailSection}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Mobile:</Text>
          <Text style={styles.count}>
            {userData.phone === "hidden" ? "Hidden" : userData.phone}
          </Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Campus:</Text>
          <Text style={styles.count}>{userData.campus[0]?.name}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Correction points:</Text>
          <Text style={styles.count}>{userData.correction_point}</Text>
        </View>
      </View>
      <View style={styles.profileDetailSection}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Location:</Text>
          <Text style={styles.count}>
            {userData.location ? userData.location : "Unavailable"}
          </Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Wallet:</Text>
          <Text style={styles.count}>{userData.wallet} ₳</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Level:</Text>
          <Text style={styles.count}>{level}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Profile intra:</Text>
          <Text
            style={styles.intraLink}
            onPress={() =>
              Linking.openURL(
                `https://profile.intra.42.fr/users/${userData.login}`
              )
            }
          >
            Link intra
          </Text>
        </View>
      </View>
      <View style={styles.levelView}>
        <PercentageBar
          height={20}
          backgroundColor={"grey"}
          percentage={`${percentage}%`}
          level={level}
        />
      </View>

      <View style={styles.profileDetailSection}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Projects:</Text>
          <ScrollView style={styles.scrollViewStyle} nestedScrollEnabled={true}>
            {projects && projects.length
              ? projects.map((project) => (
                  <Project key={project.id} item={project} />
                ))
              : null}
          </ScrollView>
        </View>
      </View>
      <View style={styles.profileDetailSection}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Skills:</Text>
          <ScrollView style={styles.scrollViewStyle} nestedScrollEnabled={true}>
            {skills && skills.length
              ? skills.map((skill) => <Skill key={skill.id} item={skill} />)
              : null}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#3498db",
  },
  headerContent: {
    padding: 16,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  login: {
    fontSize: 17,
    color: "#FFFFFF",
    fontWeight: "400",
  },
  profileDetailCursus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  profileDetailSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 3,
  },
  detailContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#3498db",
    fontWeight: "bold",
  },
  count: {
    fontSize: 18,
    marginTop: 5,
  },
  levelView: {
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
  },
  scrollViewStyle: {
    width: "98%",
    height: 200,
    marginTop: 10,
    marginLeft: 5,
    alignSelf: "center",
  },
  intraLink: {
    fontSize: 18,
    marginTop: 5,
    color: "blue",
    textDecorationLine: "underline",
  },
  backIcon: {
    position: "absolute",
    top: 15,
    left: 15,
  },
});
