import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { AppPermission, getRoleLabel, hasAppPermission } from '../../../core/rbac/policy';
import { useAppTheme } from '../../../core/theme';
import { useAuthStore } from '../../../core/store/useAuthStore';
import { useSessionStore } from '../../../core/store/useSessionStore';
import { AppText, Button, Card, Input, Screen, StateView } from '../../../core/ui';
import {
  addFeedComment,
  createFeedPost,
  FeedPost,
  FeedPostImage,
  FeedReactionKind,
  getFeedPosts,
  toggleFeedReaction,
} from '../services/feedApi';

type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

const MAX_POST_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const reactionOptions: Array<{ kind: FeedReactionKind; label: string }> = [
  { kind: 'like', label: 'Curtir' },
  { kind: 'support', label: 'Apoiar' },
  { kind: 'celebrate', label: 'Celebrar' },
];

function formatRelativeTime(value: string): string {
  const timestamp = new Date(value);
  const diffMs = Date.now() - timestamp.getTime();

  if (Number.isNaN(timestamp.getTime()) || diffMs < 0) {
    return 'Agora';
  }

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 1) return 'Agora';
  if (diffMinutes < 60) return `Ha ${diffMinutes} min`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Ha ${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);
  return `Ha ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
}

function estimateBase64Size(base64Value: string): number {
  const padding = base64Value.endsWith('==') ? 2 : base64Value.endsWith('=') ? 1 : 0;
  return Math.max(0, Math.floor((base64Value.length * 3) / 4) - padding);
}

function upsertPost(posts: FeedPost[], updatedPost: FeedPost): FeedPost[] {
  return [updatedPost, ...posts.filter((post) => post.id !== updatedPost.id)].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

export function LegacyFeedScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const role = useSessionStore((state) => state.role);
  const userName = useSessionStore((state) => state.userName);
  const identity = useAuthStore((state) => state.identity);
  const canCreatePost = hasAppPermission(role, AppPermission.POST_CREATE);

  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [composerText, setComposerText] = useState('');
  const [selectedImage, setSelectedImage] = useState<FeedPostImage | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [activeReactionPostId, setActiveReactionPostId] = useState<string | null>(null);

  const loadFeed = async (): Promise<void> => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      const loadedPosts = await getFeedPosts();
      setPosts(loadedPosts);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao carregar o feed.');
    }
  };

  useEffect(() => {
    void loadFeed();
  }, []);

  const handlePickImage = async (): Promise<void> => {
    setErrorMessage(null);

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setErrorMessage('Permita o acesso a galeria para anexar uma imagem ao post.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
      base64: true,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];
    const base64Value = asset.base64;
    const mimeType = asset.mimeType || 'image/jpeg';
    const sizeBytes = asset.fileSize || (base64Value ? estimateBase64Size(base64Value) : 0);

    if (!base64Value) {
      setErrorMessage('Nao foi possivel ler a imagem selecionada.');
      return;
    }

    if (sizeBytes > MAX_POST_IMAGE_SIZE_BYTES) {
      setErrorMessage('A imagem do post deve ter no maximo 5MB.');
      return;
    }

    setSelectedImage({
      dataUrl: `data:${mimeType};base64,${base64Value}`,
      fileName: asset.fileName || `post-${Date.now()}.jpg`,
      mimeType,
      sizeBytes,
    });
    setSuccessMessage('Imagem pronta para publicar.');
  };

  const handleSubmitPost = async (): Promise<void> => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!composerText.trim() && !selectedImage) {
      setErrorMessage('Escreva algo ou selecione uma imagem antes de publicar.');
      return;
    }

    setIsSubmittingPost(true);
    try {
      const createdPost = await createFeedPost({
        content: composerText.trim() || undefined,
        image: selectedImage || undefined,
      });

      setPosts((currentPosts) => upsertPost(currentPosts, createdPost));
      setComposerText('');
      setSelectedImage(null);
      setSuccessMessage(
        createdPost.status === 'pending'
          ? 'Post enviado para moderacao.'
          : 'Post publicado com sucesso.',
      );
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao publicar o post.');
    } finally {
      setIsSubmittingPost(false);
    }
  };

  const handleComment = async (postId: string): Promise<void> => {
    const draft = commentDrafts[postId]?.trim();
    if (!draft) {
      setErrorMessage('Escreva um comentario antes de enviar.');
      return;
    }

    setActiveCommentPostId(postId);
    setErrorMessage(null);
    try {
      const updatedPost = await addFeedComment(postId, draft);
      setPosts((currentPosts) => upsertPost(currentPosts, updatedPost));
      setCommentDrafts((currentDrafts) => ({
        ...currentDrafts,
        [postId]: '',
      }));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao comentar.');
    } finally {
      setActiveCommentPostId(null);
    }
  };

  const handleReaction = async (postId: string, kind: FeedReactionKind): Promise<void> => {
    setActiveReactionPostId(postId);
    setErrorMessage(null);
    try {
      const updatedPost = await toggleFeedReaction(postId, kind);
      setPosts((currentPosts) => upsertPost(currentPosts, updatedPost));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Falha ao reagir ao post.');
    } finally {
      setActiveReactionPostId(null);
    }
  };

  if (status === 'loading' && posts.length === 0) {
    return (
      <Screen>
        <StateView type="loading" title="A carregar feed" description="A preparar publicacoes, reacoes e comentarios." />
      </Screen>
    );
  }

  if (status === 'error' && posts.length === 0) {
    return (
      <Screen>
        <StateView
          type="error"
          title="Falha ao carregar feed"
          description={errorMessage || 'Nao foi possivel consultar o backend agora.'}
          actionLabel="Tentar novamente"
          onAction={() => {
            void loadFeed();
          }}
        />
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <AppText variant="h2">Feed social</AppText>
        <AppText variant="body" tone="muted">
          Publicacoes reais com imagem, comentarios e reacoes para toda a comunidade IPIZ.
        </AppText>
      </View>

      {canCreatePost ? (
        <Card style={styles.composerCard}>
          <AppText variant="h3">Nova publicacao</AppText>
          <AppText variant="caption" tone="muted">A publicar como {userName}</AppText>
          <Input
            label="Conteudo"
            value={composerText}
            onChangeText={setComposerText}
            multiline
            style={styles.multilineInput}
            placeholder="Partilhe um update academico, institucional ou profissional."
          />
          {selectedImage ? (
            <View style={styles.selectedImageWrap}>
              <Image source={{ uri: selectedImage.dataUrl }} style={styles.selectedImagePreview} />
              <AppText variant="caption" tone="muted">
                {selectedImage.fileName} · {(selectedImage.sizeBytes / (1024 * 1024)).toFixed(2)} MB
              </AppText>
              <Button label="Remover imagem" variant="ghost" onPress={() => setSelectedImage(null)} />
            </View>
          ) : null}
          <View style={styles.buttonRow}>
            <Button label="Selecionar imagem" variant="secondary" onPress={() => void handlePickImage()} />
            <Button label="Publicar" onPress={() => void handleSubmitPost()} loading={isSubmittingPost} />
          </View>
        </Card>
      ) : null}

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

      <View style={styles.list}>
        {posts.map((post) => {
          const currentReaction = post.reactions.find((reaction) => reaction.userId === identity?.userId)?.kind;
          const isOwnPost = post.authorUserId === identity?.userId;

          return (
            <Card key={post.id} style={styles.card}>
              <View style={styles.rowTop}>
                <View style={styles.authorWrap}>
                  <View style={[styles.avatar, { backgroundColor: theme.colors.background }]}>
                    <AppText variant="label">{post.authorName.slice(0, 2).toUpperCase()}</AppText>
                  </View>
                  <View style={styles.authorMeta}>
                    <AppText variant="label">{post.authorName}</AppText>
                    <AppText variant="caption" tone="muted">
                      {getRoleLabel(post.authorRole)} · {formatRelativeTime(post.createdAt)}
                    </AppText>
                  </View>
                </View>
                {post.status !== 'approved' ? (
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          post.status === 'rejected' ? '#FEE2E2' : '#FEF3C7',
                      },
                    ]}
                  >
                    <AppText variant="caption" tone={post.status === 'rejected' ? 'error' : 'default'}>
                      {post.status === 'rejected' ? 'Rejeitado' : isOwnPost ? 'Pendente' : 'Moderacao'}
                    </AppText>
                  </View>
                ) : null}
              </View>

              {post.content ? (
                <AppText variant="body" tone="muted" style={styles.content}>
                  {post.content}
                </AppText>
              ) : null}

              {post.image ? <Image source={{ uri: post.image.dataUrl }} style={styles.postImage} /> : null}

              <View style={styles.summaryRow}>
                <AppText variant="caption" tone="muted">
                  {post.reactions.length} reacoes
                </AppText>
                <AppText variant="caption" tone="muted">
                  {post.comments.length} comentarios
                </AppText>
              </View>

              <View style={styles.reactionWrap}>
                {reactionOptions.map((option) => (
                  <Button
                    key={`${post.id}-${option.kind}`}
                    label={currentReaction === option.kind ? `${option.label} ✓` : option.label}
                    variant={currentReaction === option.kind ? 'primary' : 'secondary'}
                    onPress={() => void handleReaction(post.id, option.kind)}
                    disabled={activeReactionPostId === post.id}
                  />
                ))}
              </View>

              {post.comments.length > 0 ? (
                <View style={styles.commentsList}>
                  {post.comments.map((comment) => (
                    <View key={comment.id} style={styles.commentItem}>
                      <AppText variant="label">{comment.authorName}</AppText>
                      <AppText variant="caption" tone="muted">
                        {getRoleLabel(comment.authorRole)} · {formatRelativeTime(comment.createdAt)}
                      </AppText>
                      <AppText variant="body" tone="muted">{comment.content}</AppText>
                    </View>
                  ))}
                </View>
              ) : (
                <AppText variant="caption" tone="muted">Ainda sem comentarios nesta publicacao.</AppText>
              )}

              <Input
                label="Novo comentario"
                value={commentDrafts[post.id] || ''}
                onChangeText={(value) =>
                  setCommentDrafts((currentDrafts) => ({
                    ...currentDrafts,
                    [post.id]: value,
                  }))
                }
                placeholder="Escreva um comentario rapido"
              />
              <Button
                label="Comentar"
                variant="secondary"
                onPress={() => void handleComment(post.id)}
                loading={activeCommentPostId === post.id}
              />
            </Card>
          );
        })}
      </View>

      {status === 'success' && posts.length === 0 ? (
        <StateView
          type="empty"
          title="Sem publicacoes ainda"
          description="O feed sera preenchido assim que a comunidade comecar a publicar."
          actionLabel="Atualizar"
          onAction={() => {
            void loadFeed();
          }}
        />
      ) : null}

      <Pressable
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.loadMore,
          {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
            opacity: pressed ? 0.88 : 1,
          },
        ]}
        onPress={() => {
          void loadFeed();
        }}
      >
        <AppText variant="label" tone="muted">
          Atualizar feed
        </AppText>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
    gap: 8,
  },
  feedbackCard: {
    marginBottom: 12,
  },
  composerCard: {
    gap: 10,
    marginBottom: 12,
  },
  multilineInput: {
    minHeight: 112,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  selectedImageWrap: {
    gap: 8,
  },
  selectedImagePreview: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  list: {
    gap: 12,
  },
  card: {
    gap: 10,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  authorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  authorMeta: {
    flex: 1,
    gap: 2,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  content: {
    marginTop: 2,
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  reactionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  commentsList: {
    gap: 8,
  },
  commentItem: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 10,
    gap: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  loadMore: {
    marginTop: 16,
    borderWidth: 1,
    minHeight: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
