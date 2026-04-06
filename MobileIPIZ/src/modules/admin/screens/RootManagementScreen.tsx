import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppRole, getRoleLabel } from '../../../core/rbac/policy';
import { AppText, Button, Card, Input, Screen, StateView } from '../../../core/ui';
import { useSessionStore } from '../../../core/store/useSessionStore';
import {
  assignManagedUserRole,
  ClassGroup,
  createClassGroup,
  createManagedUser,
  CreateManagedUserInput,
  createSubject,
  deleteClassGroup,
  deletePost,
  deleteSubject,
  getClassGroups,
  getManagedPosts,
  getManagedUsers,
  getPendingPosts,
  getSubjects,
  ManagedPost,
  ManagedUser,
  Subject,
  updateClassGroup,
  updateManagedUser,
  updatePost,
  updateSubject,
  verifyPost,
} from '../services/rootAdminApi';

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

const roleChoices: AppRole[] = [
  AppRole.STUDENT,
  AppRole.TEACHER,
  AppRole.ADMIN,
  AppRole.COMPANY,
  AppRole.ALUMNI,
  AppRole.SUPER_ROOT,
];

export function RootManagementScreen(): React.JSX.Element {
  const role = useSessionStore((state) => state.role);

  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [posts, setPosts] = useState<ManagedPost[]>([]);
  const [pendingPosts, setPendingPosts] = useState<ManagedPost[]>([]);

  const [newUser, setNewUser] = useState<CreateManagedUserInput>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: AppRole.STUDENT,
    isActive: true,
  });

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingUserFirstName, setEditingUserFirstName] = useState('');
  const [editingUserLastName, setEditingUserLastName] = useState('');
  const [editingUserRole, setEditingUserRole] = useState<AppRole | null>(null);
  const [editingUserClassGroupId, setEditingUserClassGroupId] = useState('');

  const [newClassName, setNewClassName] = useState('');
  const [newClassCode, setNewClassCode] = useState('');
  const [newClassYear, setNewClassYear] = useState('2026');
  const [newClassTerm, setNewClassTerm] = useState('1');
  const [newClassCapacity, setNewClassCapacity] = useState('35');
  const [newClassCoordinatorId, setNewClassCoordinatorId] = useState('');

  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [editingClassName, setEditingClassName] = useState('');
  const [editingClassCode, setEditingClassCode] = useState('');
  const [editingClassCoordinatorId, setEditingClassCoordinatorId] = useState('');

  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectCode, setNewSubjectCode] = useState('');
  const [newSubjectWorkload, setNewSubjectWorkload] = useState('60');
  const [newSubjectClassId, setNewSubjectClassId] = useState('');
  const [newSubjectTeacherId, setNewSubjectTeacherId] = useState('');

  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [editingSubjectName, setEditingSubjectName] = useState('');
  const [editingSubjectCode, setEditingSubjectCode] = useState('');
  const [editingSubjectClassId, setEditingSubjectClassId] = useState('');
  const [editingSubjectTeacherId, setEditingSubjectTeacherId] = useState('');

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingPostContent, setEditingPostContent] = useState('');

  const teachers = useMemo(
    () => users.filter((user) => user.role === AppRole.TEACHER),
    [users],
  );

  const administrativeStaff = useMemo(
    () => users.filter((user) => user.role === AppRole.ADMIN),
    [users],
  );

  const classLookup = useMemo(() => {
    const map = new Map<string, ClassGroup>();
    classes.forEach((item) => {
      map.set(item.id, item);
    });

    return map;
  }, [classes]);

  const userLookup = useMemo(() => {
    const map = new Map<string, ManagedUser>();
    users.forEach((item) => {
      map.set(item.id, item);
    });

    return map;
  }, [users]);

  const resetFeedback = (): void => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const loadAll = useCallback(async (): Promise<void> => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      const [loadedUsers, loadedClasses, loadedSubjects, loadedPosts, loadedPendingPosts] =
        await Promise.all([
          getManagedUsers(),
          getClassGroups(),
          getSubjects(),
          getManagedPosts(),
          getPendingPosts(),
        ]);

      setUsers(loadedUsers);
      setClasses(loadedClasses);
      setSubjects(loadedSubjects);
      setPosts(loadedPosts);
      setPendingPosts(loadedPendingPosts);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setSuccessMessage(null);
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao carregar dados de gestão.');
    }
  }, []);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const handleCreateUser = async (): Promise<void> => {
    resetFeedback();

    if (!newUser.email.trim() || !newUser.password.trim() || !newUser.firstName.trim() || !newUser.lastName.trim()) {
      setErrorMessage('Preencha email, senha, nome e sobrenome para criar o usuario.');
      return;
    }

    if (newUser.role === AppRole.STUDENT && !newUser.classGroupId) {
      setErrorMessage('Selecione a turma do estudante antes de criar o usuario.');
      return;
    }

    try {
      await createManagedUser({
        ...newUser,
        email: newUser.email.trim().toLowerCase(),
        firstName: newUser.firstName.trim(),
        lastName: newUser.lastName.trim(),
        classGroupId: newUser.role === AppRole.STUDENT ? newUser.classGroupId : undefined,
      });

      setSuccessMessage('Usuario criado com sucesso.');
      setNewUser({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: AppRole.STUDENT,
        isActive: true,
        classGroupId: undefined,
      });

      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao criar usuario.');
    }
  };

  const handleStartEditUser = (user: ManagedUser): void => {
    setEditingUserId(user.id);
    setEditingUserFirstName(user.firstName);
    setEditingUserLastName(user.lastName);
    setEditingUserRole(user.role);
    setEditingUserClassGroupId(user.classGroupId || '');
  };

  const handleSaveEditUser = async (): Promise<void> => {
    if (!editingUserId) {
      return;
    }

    try {
      await updateManagedUser(editingUserId, {
        firstName: editingUserFirstName.trim(),
        lastName: editingUserLastName.trim(),
        classGroupId: editingUserRole === AppRole.STUDENT ? editingUserClassGroupId || undefined : undefined,
      });

      setSuccessMessage('Usuario atualizado.');
      setEditingUserId(null);
      setEditingUserRole(null);
      setEditingUserClassGroupId('');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao atualizar usuario.');
    }
  };

  const handleToggleActive = async (user: ManagedUser): Promise<void> => {
    try {
      await updateManagedUser(user.id, { isActive: !user.isActive });
      setSuccessMessage(
        user.isActive ? 'Usuario desativado com sucesso.' : 'Usuario reativado com sucesso.',
      );
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao alterar status do usuario.');
    }
  };

  const handleAssignRole = async (userId: string, targetRole: AppRole): Promise<void> => {
    try {
      await assignManagedUserRole(userId, targetRole);
      setSuccessMessage('Papel atualizado com sucesso.');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao atualizar papel do usuario.');
    }
  };

  const handleCreateClass = async (): Promise<void> => {
    resetFeedback();

    if (!newClassName.trim() || !newClassCode.trim()) {
      setErrorMessage('Informe nome e codigo da turma.');
      return;
    }

    try {
      await createClassGroup({
        name: newClassName.trim(),
        code: newClassCode.trim(),
        academicYear: newClassYear.trim(),
        term: newClassTerm.trim(),
        capacity: Number(newClassCapacity) || 0,
        coordinatorTeacherId: newClassCoordinatorId || undefined,
      });

      setSuccessMessage('Turma criada com sucesso.');
      setNewClassName('');
      setNewClassCode('');
      setNewClassCoordinatorId('');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao criar turma.');
    }
  };

  const handleStartEditClass = (item: ClassGroup): void => {
    setEditingClassId(item.id);
    setEditingClassName(item.name);
    setEditingClassCode(item.code);
    setEditingClassCoordinatorId(item.coordinatorTeacherId || '');
  };

  const handleSaveEditClass = async (): Promise<void> => {
    if (!editingClassId) {
      return;
    }

    try {
      await updateClassGroup(editingClassId, {
        name: editingClassName.trim(),
        code: editingClassCode.trim(),
        coordinatorTeacherId: editingClassCoordinatorId || undefined,
      });

      setSuccessMessage('Turma atualizada com sucesso.');
      setEditingClassId(null);
      setEditingClassCoordinatorId('');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao atualizar turma.');
    }
  };

  const handleDeleteClass = async (id: string): Promise<void> => {
    try {
      await deleteClassGroup(id);
      setSuccessMessage('Turma removida com sucesso.');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao remover turma.');
    }
  };

  const handleCreateSubject = async (): Promise<void> => {
    resetFeedback();

    if (!newSubjectName.trim() || !newSubjectCode.trim() || !newSubjectClassId.trim()) {
      setErrorMessage('Informe nome, codigo e turma para criar a disciplina.');
      return;
    }

    try {
      await createSubject({
        name: newSubjectName.trim(),
        code: newSubjectCode.trim(),
        workloadHours: Number(newSubjectWorkload) || 0,
        classGroupId: newSubjectClassId.trim(),
        teacherId: newSubjectTeacherId.trim() || undefined,
      });

      setSuccessMessage('Disciplina criada com sucesso.');
      setNewSubjectName('');
      setNewSubjectCode('');
      setNewSubjectClassId('');
      setNewSubjectTeacherId('');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao criar disciplina.');
    }
  };

  const handleStartEditSubject = (item: Subject): void => {
    setEditingSubjectId(item.id);
    setEditingSubjectName(item.name);
    setEditingSubjectCode(item.code);
    setEditingSubjectClassId(item.classGroupId);
    setEditingSubjectTeacherId(item.teacherId || '');
  };

  const handleSaveEditSubject = async (): Promise<void> => {
    if (!editingSubjectId) {
      return;
    }

    if (!editingSubjectClassId.trim()) {
      setErrorMessage('Selecione uma turma para salvar a disciplina.');
      return;
    }

    try {
      await updateSubject(editingSubjectId, {
        name: editingSubjectName.trim(),
        code: editingSubjectCode.trim(),
        classGroupId: editingSubjectClassId,
        teacherId: editingSubjectTeacherId || undefined,
      });

      setSuccessMessage('Disciplina atualizada com sucesso.');
      setEditingSubjectId(null);
      setEditingSubjectClassId('');
      setEditingSubjectTeacherId('');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao atualizar disciplina.');
    }
  };

  const handleDeleteSubject = async (id: string): Promise<void> => {
    try {
      await deleteSubject(id);
      setSuccessMessage('Disciplina removida com sucesso.');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao remover disciplina.');
    }
  };

  const handleVerifyPost = async (id: string, approved: boolean): Promise<void> => {
    try {
      await verifyPost(id, approved);
      setSuccessMessage(approved ? 'Post aprovado.' : 'Post rejeitado.');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao verificar post.');
    }
  };

  const handleStartEditPost = (post: ManagedPost): void => {
    setEditingPostId(post.id);
    setEditingPostContent(post.content);
  };

  const handleSavePost = async (): Promise<void> => {
    if (!editingPostId) {
      return;
    }

    try {
      await updatePost(editingPostId, editingPostContent);
      setSuccessMessage('Post atualizado com sucesso.');
      setEditingPostId(null);
      setEditingPostContent('');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao editar post.');
    }
  };

  const handleDeletePost = async (id: string): Promise<void> => {
    try {
      await deletePost(id);
      setSuccessMessage('Post removido com sucesso.');
      await loadAll();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao remover post.');
    }
  };

  if (role !== AppRole.SUPER_ROOT) {
    return (
      <StateView
        type="error"
        title="Acesso restrito"
        description="Somente SUPER_ROOT pode acessar esta area de gestao global."
      />
    );
  }

  if (status === 'loading' && users.length === 0 && !errorMessage) {
    return (
      <StateView
        type="loading"
        title="Carregando dados da gestao"
        description="Buscando usuarios, turmas, disciplinas e posts."
      />
    );
  }

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <AppText variant="h2">Gestao SUPER_ROOT</AppText>
        <AppText variant="body" tone="muted">
          Gerencie usuarios, turmas, disciplinas, professores, pessoal administrativo e posts.
        </AppText>
        <Button label={status === 'loading' ? 'Atualizando...' : 'Atualizar dados'} onPress={() => void loadAll()} disabled={status === 'loading'} />
      </View>

      {errorMessage ? (
        <Card style={styles.feedbackCard}>
          <AppText variant="caption" tone="error">{errorMessage}</AppText>
        </Card>
      ) : null}

      {successMessage ? (
        <Card style={styles.feedbackCard}>
          <AppText variant="caption" tone="success">{successMessage}</AppText>
        </Card>
      ) : null}

      <Card style={styles.section}>
        <AppText variant="h3">Resumo</AppText>
        <AppText variant="caption" tone="muted">Usuarios: {users.length}</AppText>
        <AppText variant="caption" tone="muted">Professores: {teachers.length}</AppText>
        <AppText variant="caption" tone="muted">Pessoal administrativo: {administrativeStaff.length}</AppText>
        <AppText variant="caption" tone="muted">Turmas: {classes.length}</AppText>
        <AppText variant="caption" tone="muted">Disciplinas: {subjects.length}</AppText>
        <AppText variant="caption" tone="muted">Posts pendentes: {pendingPosts.length}</AppText>
      </Card>

      <Card style={styles.section}>
        <AppText variant="h3">Adicionar usuario</AppText>
        <Input label="Nome" value={newUser.firstName} onChangeText={(value) => setNewUser((prev) => ({ ...prev, firstName: value }))} />
        <Input label="Sobrenome" value={newUser.lastName} onChangeText={(value) => setNewUser((prev) => ({ ...prev, lastName: value }))} />
        <Input label="Email" value={newUser.email} autoCapitalize="none" keyboardType="email-address" onChangeText={(value) => setNewUser((prev) => ({ ...prev, email: value }))} />
        <Input label="Senha inicial" secureTextEntry value={newUser.password} onChangeText={(value) => setNewUser((prev) => ({ ...prev, password: value }))} />
        <View style={styles.roleWrap}>
          {roleChoices.map((choice) => (
            <Button
              key={choice}
              label={getRoleLabel(choice)}
              variant={newUser.role === choice ? 'primary' : 'secondary'}
              onPress={() =>
                setNewUser((prev) => ({
                  ...prev,
                  role: choice,
                  classGroupId: choice === AppRole.STUDENT ? prev.classGroupId : undefined,
                }))
              }
            />
          ))}
        </View>
        {newUser.role === AppRole.STUDENT ? (
          <>
            <AppText variant="caption" tone="muted">Turma do estudante</AppText>
            {classes.length === 0 ? (
              <AppText variant="caption" tone="muted">Crie uma turma antes de cadastrar estudantes.</AppText>
            ) : null}
            <View style={styles.selectorWrap}>
              {classes.map((item) => (
                <Button
                  key={`new-student-class-${item.id}`}
                  label={`${item.code} - ${item.name}`}
                  variant={newUser.classGroupId === item.id ? 'primary' : 'secondary'}
                  onPress={() => setNewUser((prev) => ({ ...prev, classGroupId: item.id }))}
                />
              ))}
            </View>
          </>
        ) : null}
        <Button label="Criar usuario" onPress={() => void handleCreateUser()} />
      </Card>

      <Card style={styles.section}>
        <AppText variant="h3">Usuarios e equipe</AppText>
        {users.map((user) => (
          <Card key={user.id} style={styles.innerCard}>
            <AppText variant="label">{user.firstName} {user.lastName}</AppText>
            <AppText variant="caption" tone="muted">{user.email}</AppText>
            <AppText variant="caption" tone="muted">Papel: {getRoleLabel(user.role)}</AppText>
            {user.role === AppRole.STUDENT ? (
              <AppText variant="caption" tone="muted">
                Turma: {user.classGroupId ? `${classLookup.get(user.classGroupId)?.code || 'Turma'} - ${classLookup.get(user.classGroupId)?.name || 'nao encontrada'}` : 'Sem turma vinculada'}
              </AppText>
            ) : null}
            <AppText variant="caption" tone={user.isActive ? 'success' : 'error'}>
              {user.isActive ? 'Ativo' : 'Inativo'}
            </AppText>
            <View style={styles.buttonRow}>
              <Button label="Editar" variant="secondary" onPress={() => handleStartEditUser(user)} />
              <Button
                label={user.isActive ? 'Desativar' : 'Ativar'}
                variant="secondary"
                onPress={() => void handleToggleActive(user)}
              />
            </View>
            <View style={styles.buttonRow}>
              <Button label="Professor" variant="ghost" onPress={() => void handleAssignRole(user.id, AppRole.TEACHER)} />
              <Button label="Admin" variant="ghost" onPress={() => void handleAssignRole(user.id, AppRole.ADMIN)} />
              <Button label="Estudante" variant="ghost" onPress={() => void handleAssignRole(user.id, AppRole.STUDENT)} />
            </View>
          </Card>
        ))}

        {editingUserId ? (
          <Card style={styles.innerCard}>
            <AppText variant="label">Editar usuario</AppText>
            <Input label="Nome" value={editingUserFirstName} onChangeText={setEditingUserFirstName} />
            <Input label="Sobrenome" value={editingUserLastName} onChangeText={setEditingUserLastName} />
            {editingUserRole === AppRole.STUDENT ? (
              <>
                <AppText variant="caption" tone="muted">Turma do estudante</AppText>
                <View style={styles.selectorWrap}>
                  <Button
                    label="Sem turma"
                    variant={editingUserClassGroupId ? 'secondary' : 'primary'}
                    onPress={() => setEditingUserClassGroupId('')}
                  />
                  {classes.map((item) => (
                    <Button
                      key={`edit-student-class-${item.id}`}
                      label={`${item.code} - ${item.name}`}
                      variant={editingUserClassGroupId === item.id ? 'primary' : 'secondary'}
                      onPress={() => setEditingUserClassGroupId(item.id)}
                    />
                  ))}
                </View>
              </>
            ) : null}
            <View style={styles.buttonRow}>
              <Button label="Salvar" onPress={() => void handleSaveEditUser()} />
              <Button
                label="Cancelar"
                variant="secondary"
                onPress={() => {
                  setEditingUserId(null);
                  setEditingUserRole(null);
                  setEditingUserClassGroupId('');
                }}
              />
            </View>
          </Card>
        ) : null}
      </Card>

      <Card style={styles.section}>
        <AppText variant="h3">Turmas</AppText>
        <Input label="Nome da turma" value={newClassName} onChangeText={setNewClassName} />
        <Input label="Codigo" value={newClassCode} onChangeText={setNewClassCode} />
        <Input label="Ano letivo" value={newClassYear} onChangeText={setNewClassYear} />
        <Input label="Termo/semestre" value={newClassTerm} onChangeText={setNewClassTerm} />
        <Input label="Capacidade" keyboardType="number-pad" value={newClassCapacity} onChangeText={setNewClassCapacity} />
        <AppText variant="caption" tone="muted">Coordenador da turma (opcional)</AppText>
        {teachers.length === 0 ? (
          <AppText variant="caption" tone="muted">Nenhum professor disponivel para selecao.</AppText>
        ) : null}
        <View style={styles.selectorWrap}>
          <Button
            label="Sem coordenador"
            variant={newClassCoordinatorId ? 'secondary' : 'primary'}
            onPress={() => setNewClassCoordinatorId('')}
          />
          {teachers.map((teacher) => (
            <Button
              key={`coord-${teacher.id}`}
              label={`${teacher.firstName} ${teacher.lastName}`}
              variant={newClassCoordinatorId === teacher.id ? 'primary' : 'secondary'}
              onPress={() => setNewClassCoordinatorId(teacher.id)}
            />
          ))}
        </View>
        <Button label="Criar turma" onPress={() => void handleCreateClass()} />

        {classes.map((item) => (
          <Card key={item.id} style={styles.innerCard}>
            <AppText variant="label">{item.name}</AppText>
            <AppText variant="caption" tone="muted">Codigo: {item.code}</AppText>
            <AppText variant="caption" tone="muted">Ano: {item.academicYear} | Termo: {item.term}</AppText>
            <AppText variant="caption" tone="muted">
              Coordenador: {item.coordinatorTeacherId && userLookup.get(item.coordinatorTeacherId)
                ? `${userLookup.get(item.coordinatorTeacherId)?.firstName} ${userLookup.get(item.coordinatorTeacherId)?.lastName}`
                : 'Nao definido'}
            </AppText>
            <View style={styles.buttonRow}>
              <Button label="Editar" variant="secondary" onPress={() => handleStartEditClass(item)} />
              <Button label="Remover" variant="ghost" onPress={() => void handleDeleteClass(item.id)} />
            </View>
          </Card>
        ))}

        {editingClassId ? (
          <Card style={styles.innerCard}>
            <AppText variant="label">Editar turma</AppText>
            <Input label="Nome" value={editingClassName} onChangeText={setEditingClassName} />
            <Input label="Codigo" value={editingClassCode} onChangeText={setEditingClassCode} />
            <AppText variant="caption" tone="muted">Coordenador da turma</AppText>
            <View style={styles.selectorWrap}>
              <Button
                label="Sem coordenador"
                variant={editingClassCoordinatorId ? 'secondary' : 'primary'}
                onPress={() => setEditingClassCoordinatorId('')}
              />
              {teachers.map((teacher) => (
                <Button
                  key={`edit-coord-${teacher.id}`}
                  label={`${teacher.firstName} ${teacher.lastName}`}
                  variant={editingClassCoordinatorId === teacher.id ? 'primary' : 'secondary'}
                  onPress={() => setEditingClassCoordinatorId(teacher.id)}
                />
              ))}
            </View>
            <View style={styles.buttonRow}>
              <Button label="Salvar" onPress={() => void handleSaveEditClass()} />
              <Button
                label="Cancelar"
                variant="secondary"
                onPress={() => {
                  setEditingClassId(null);
                  setEditingClassCoordinatorId('');
                }}
              />
            </View>
          </Card>
        ) : null}
      </Card>

      <Card style={styles.section}>
        <AppText variant="h3">Disciplinas</AppText>
        <Input label="Nome da disciplina" value={newSubjectName} onChangeText={setNewSubjectName} />
        <Input label="Codigo" value={newSubjectCode} onChangeText={setNewSubjectCode} />
        <Input label="Carga horaria" keyboardType="number-pad" value={newSubjectWorkload} onChangeText={setNewSubjectWorkload} />
        <AppText variant="caption" tone="muted">Selecione a turma</AppText>
        {classes.length === 0 ? (
          <AppText variant="caption" tone="muted">Crie uma turma antes de cadastrar disciplinas.</AppText>
        ) : null}
        <View style={styles.selectorWrap}>
          {classes.map((item) => (
            <Button
              key={`subject-class-${item.id}`}
              label={`${item.code} - ${item.name}`}
              variant={newSubjectClassId === item.id ? 'primary' : 'secondary'}
              onPress={() => setNewSubjectClassId(item.id)}
            />
          ))}
        </View>
        <AppText variant="caption" tone="muted">Selecione o professor (opcional)</AppText>
        <View style={styles.selectorWrap}>
          <Button
            label="Sem professor"
            variant={newSubjectTeacherId ? 'secondary' : 'primary'}
            onPress={() => setNewSubjectTeacherId('')}
          />
          {teachers.map((teacher) => (
            <Button
              key={`subject-teacher-${teacher.id}`}
              label={`${teacher.firstName} ${teacher.lastName}`}
              variant={newSubjectTeacherId === teacher.id ? 'primary' : 'secondary'}
              onPress={() => setNewSubjectTeacherId(teacher.id)}
            />
          ))}
        </View>
        <Button label="Criar disciplina" onPress={() => void handleCreateSubject()} />

        {subjects.map((item) => (
          <Card key={item.id} style={styles.innerCard}>
            <AppText variant="label">{item.name}</AppText>
            <AppText variant="caption" tone="muted">Codigo: {item.code}</AppText>
            <AppText variant="caption" tone="muted">
              Turma: {classLookup.get(item.classGroupId)
                ? `${classLookup.get(item.classGroupId)?.code} - ${classLookup.get(item.classGroupId)?.name}`
                : 'Turma nao encontrada'}
            </AppText>
            <AppText variant="caption" tone="muted">
              Professor: {item.teacherId && userLookup.get(item.teacherId)
                ? `${userLookup.get(item.teacherId)?.firstName} ${userLookup.get(item.teacherId)?.lastName}`
                : 'Nao definido'}
            </AppText>
            <View style={styles.buttonRow}>
              <Button label="Editar" variant="secondary" onPress={() => handleStartEditSubject(item)} />
              <Button label="Remover" variant="ghost" onPress={() => void handleDeleteSubject(item.id)} />
            </View>
          </Card>
        ))}

        {editingSubjectId ? (
          <Card style={styles.innerCard}>
            <AppText variant="label">Editar disciplina</AppText>
            <Input label="Nome" value={editingSubjectName} onChangeText={setEditingSubjectName} />
            <Input label="Codigo" value={editingSubjectCode} onChangeText={setEditingSubjectCode} />
            <AppText variant="caption" tone="muted">Turma da disciplina</AppText>
            <View style={styles.selectorWrap}>
              {classes.map((item) => (
                <Button
                  key={`edit-subject-class-${item.id}`}
                  label={`${item.code} - ${item.name}`}
                  variant={editingSubjectClassId === item.id ? 'primary' : 'secondary'}
                  onPress={() => setEditingSubjectClassId(item.id)}
                />
              ))}
            </View>
            <AppText variant="caption" tone="muted">Professor responsavel</AppText>
            <View style={styles.selectorWrap}>
              <Button
                label="Sem professor"
                variant={editingSubjectTeacherId ? 'secondary' : 'primary'}
                onPress={() => setEditingSubjectTeacherId('')}
              />
              {teachers.map((teacher) => (
                <Button
                  key={`edit-subject-teacher-${teacher.id}`}
                  label={`${teacher.firstName} ${teacher.lastName}`}
                  variant={editingSubjectTeacherId === teacher.id ? 'primary' : 'secondary'}
                  onPress={() => setEditingSubjectTeacherId(teacher.id)}
                />
              ))}
            </View>
            <View style={styles.buttonRow}>
              <Button label="Salvar" onPress={() => void handleSaveEditSubject()} />
              <Button
                label="Cancelar"
                variant="secondary"
                onPress={() => {
                  setEditingSubjectId(null);
                  setEditingSubjectClassId('');
                  setEditingSubjectTeacherId('');
                }}
              />
            </View>
          </Card>
        ) : null}
      </Card>

      <Card style={styles.section}>
        <AppText variant="h3">Moderacao de posts</AppText>
        <AppText variant="caption" tone="muted">Pendentes para verificacao</AppText>
        {pendingPosts.map((post) => (
          <Card key={post.id} style={styles.innerCard}>
            <AppText variant="label">{post.authorName}</AppText>
            <AppText variant="caption" tone="muted">{post.authorRole}</AppText>
            <AppText variant="body" tone="muted">{post.content}</AppText>
            <View style={styles.buttonRow}>
              <Button label="Aprovar" onPress={() => void handleVerifyPost(post.id, true)} />
              <Button label="Rejeitar" variant="secondary" onPress={() => void handleVerifyPost(post.id, false)} />
            </View>
          </Card>
        ))}

        <AppText variant="caption" tone="muted">Todos os posts</AppText>
        {posts.map((post) => (
          <Card key={`all-${post.id}`} style={styles.innerCard}>
            <AppText variant="label">{post.authorName}</AppText>
            <AppText variant="caption" tone="muted">Status: {post.status}</AppText>
            <AppText variant="body" tone="muted">{post.content}</AppText>
            <View style={styles.buttonRow}>
              <Button label="Editar" variant="secondary" onPress={() => handleStartEditPost(post)} />
              <Button label="Remover" variant="ghost" onPress={() => void handleDeletePost(post.id)} />
            </View>
          </Card>
        ))}

        {editingPostId ? (
          <Card style={styles.innerCard}>
            <AppText variant="label">Editar post</AppText>
            <Input label="Conteudo" value={editingPostContent} onChangeText={setEditingPostContent} multiline />
            <View style={styles.buttonRow}>
              <Button label="Salvar" onPress={() => void handleSavePost()} />
              <Button label="Cancelar" variant="secondary" onPress={() => setEditingPostId(null)} />
            </View>
          </Card>
        ) : null}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10,
    marginBottom: 16,
  },
  feedbackCard: {
    marginBottom: 12,
  },
  section: {
    gap: 10,
    marginBottom: 14,
  },
  innerCard: {
    gap: 8,
  },
  roleWrap: {
    gap: 8,
  },
  selectorWrap: {
    gap: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
